"use client";
import Sortable from "sortablejs";
import { rankMetaList } from "@/lib/rank";
import { useEffect, useRef, useState } from "react";
import { App } from "antd";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Setting() {
  const { message } = App.useApp();
  const rankListRef = useRef<HTMLDivElement>(null);
  const [sortedRankMetaList, setSortedRankMetaList] = useState(rankMetaList);

  useEffect(() => {
    if (rankListRef.current) {
      Sortable.create(rankListRef.current, {
        // 当排序操作完成时调用
        onUpdate: function (evt: any) {
          // 使用数组解构和 slice 来创建列表的副本
          let newRankMetaList = [...sortedRankMetaList];
          // 使用 splice 来调整元素
          const [reorderedItem] = newRankMetaList.splice(evt.oldIndex, 1);
          newRankMetaList.splice(evt.newIndex, 0, reorderedItem);
          setSortedRankMetaList((pre) => [...newRankMetaList]);
          // 更新状态以反映新的排序
          localStorage.setItem("rankMetaList", JSON.stringify(newRankMetaList));
          message.success("榜单排序成功");
        },
      });
    }
  }, []);

  return (
    <div className="border rounded-md p-4 bg-white dark:bg-slate-950">
      <div className="mb-2 flex justify-between items-center">
        <div>
          <div className="text-xl ">榜单排序</div>
          <p className="text-sm text-slate-400">拖拽排序</p>
        </div>

        <Button
          variant={"link"}
          onClick={() => setSortedRankMetaList(() => [...rankMetaList])}>
          恢复默认
        </Button>
      </div>
      <div
        ref={rankListRef}
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-6 gap-2">
        {sortedRankMetaList.map((rank, index) => (
          <div key={index} className="cursor-grab px-4 py-2 border rounded-md">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
