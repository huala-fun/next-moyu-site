"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRankList } from "@/lib/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";
import { useImmer } from "use-immer";

export default function Tabs() {
  const [rankList, updateRankList] = useImmer<Rank[]>([]);
  const [activeTab, setActiveTab] = useImmer<any>(null);
  const [rankData, setRankData] = useImmer<RankItem[]>([]);

  useEffect(() => {
    const initialRankList = getRankList();
    updateRankList(initialRankList);
    if (initialRankList.length) {
      setActiveTab(initialRankList[0]);
    }
  }, []);

  useEffect(() => {
    const fetchRankData = async () => {
      const res = await fetch(`/api/hot-rank?id=${activeTab.id}`);
      const { code = 0, data = [] } = await res.json();
      code == 1 && setRankData(data);
    };
    activeTab && fetchRankData();
  }, [activeTab]);

  if (!activeTab) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-row  flex-wrap bg-white">
        {rankList.map((rank) => (
          <div
            key={rank.id}
            onClick={() => setActiveTab(rank)}
            className={cn(
              "flex gap-2 px-2 py-1 text-sm rounded-lg cursor-pointer border dark:text-white",
              activeTab.id == rank.id &&
                "dark:bg-transparent  text-red-600 dark:text-red-600"
            )}>
            <Image src={`/${rank.source}.ico`} alt="" width={20} height={20} />
            <span className="flex-shrink-0">{rank.name}</span>
          </div>
        ))}
      </div>
      <Card className="border shadow-none  border-slate-100 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Image
                src={`/${activeTab.source}.ico`}
                alt=""
                width={20}
                height={20}
              />
              <span className="flex-shrink-0">{activeTab.name}</span>
            </div>
            <div>共 {rankData.length} 条</div>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col gap-3">
            {rankData.map((item, index) => (
              <div
                key={item.id}
                onClick={() => window.open(item.link, "_blank")}
                className="flex items-center gap-2 text-sm prose dark:prose-invert px-1 hover:cursor-pointer">
                <span
                  className={cn(
                    "flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-md w-6 h-6 flex-shrink-0",
                    index < 3 ? "text-white" : "",
                    index === 0
                      ? "bg-red-500 dark:bg-red-500 text-white"
                      : index === 1
                      ? "bg-orange-500 dark:bg-orange-500"
                      : index === 2
                      ? "bg-yellow-500 dark:bg-yellow-500"
                      : ""
                  )}>
                  {index + 1}
                </span>
                <span className="move-right-animate">{item.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
