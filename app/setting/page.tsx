"use client";
import Sortable from "sortablejs";
import { rankMetaList } from "@/lib/rank";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getRankList, setRankList } from "@/lib/store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";

export default function Setting() {
  const rankListRef = useRef<HTMLDivElement>(null);
  const sortedRankMetaList = useRef<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const updateRankList = (newList: any) => {
    sortedRankMetaList.current = newList;
    setRankList(newList);
  };
  useEffect(() => {
    sortedRankMetaList.current = getRankList();
    setRefresh(!refresh);
    if (rankListRef.current) {
      Sortable.create(rankListRef.current, {
        onEnd: (evt: any) => {
          const newList = [...sortedRankMetaList.current];
          const [element] = newList.splice(evt.oldIndex, 1);
          newList.splice(evt.newIndex, 0, element);
          updateRankList(newList);
          toast.success("排序成功");
        },
      });
    }
  }, []);

  return (
    <Card className="border rounded-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl ">榜单排序</div>
            <p className="text-sm text-slate-400">拖拽排序</p>
          </div>
          <Button
            onClick={() => {
              updateRankList(rankMetaList);
              setRefresh(!refresh);
            }}>
            恢复默认
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={rankListRef}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-6 gap-2">
          {sortedRankMetaList?.current.map((rank: any, index: number) => (
            <div
              key={index}
              className="cursor-grab px-4 py-2 border rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/${rank.source}.ico`}
                    alt=""
                    width={32}
                    height={32}
                  />
                  <span className=" text-lg"> {rank.name}</span>
                </div>
                <Switch checked={true}></Switch>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
