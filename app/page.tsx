"use client";
import { useEffect, useState } from "react";
import { TabsView } from "@/components/rank/tabsView";
import { GridView } from "@/components/rank/grid-view";
import { isMobile } from "react-device-detect";
import Header from "@/components/home/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const fetchHotRankMetaList = async () => {
  const res = await fetch("/api/hot-rank/list");
  const { code, data } = await res.json();
  return code === 1
    ? data.map((item: Rank) => ({ ...item, data: [], isLoadData: true }))
    : [];
};

export default function HotRank() {
  const [rankList, setRankList] = useState<Rank[]>([]);

  useEffect(() => {
    const handleLoadRankData = async () => {
      const initialData = await fetchHotRankMetaList();
      setRankList(initialData);
    };
    handleLoadRankData();
  }, []);

  return (
    <div className="px-4 sm:px-64">
      <Header />
      <Link href="/aggregation" target="_blank">
        <Card className="shadow-none mt-4">
          <CardHeader>
            <CardTitle>新闻聚合</CardTitle>
            <CardDescription>
              一共收录{rankList.length}个新闻网站
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {rankList.map((item) => {
                return (
                  <div
                    key={item.id}
                    className=" flex-shrink-0 flex gap-2 items-center">
                    <Image
                      src={`/${item.source}.ico`}
                      alt=""
                      width={20}
                      height={20}
                    />{" "}
                    {item.name}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
