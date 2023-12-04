"use client";
import { SkeletonBar } from "@/components/skeleton-bar";
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

export default function Tabs({ params }: { params: { slug: string } }) {
  const [rankList, updateRankList] = useImmer<Rank[]>([]);
  const [activeTab, setActiveTab] = useImmer<any>(null);
  const [rankData, setRankData] = useImmer<RankItem[]>([]);
  const [isLoadData, setIsLoadData] = useImmer(false);

  useEffect(() => {
    const initialRankList = getRankList();
    const item = initialRankList.find((item) => (item.id = params.slug));
    item && setActiveTab(item);
    updateRankList(initialRankList);
  }, []);

  useEffect(() => {
    const fetchRankData = async () => {
      setIsLoadData(true);
      const res = await fetch(`/api/hot-rank?id=${activeTab.id}`);
      const { code = 0, data = [] } = await res.json();
      code == 1 && setRankData(data);
      setIsLoadData(false);
    };
    activeTab && fetchRankData();
  }, [activeTab]);

  if (!activeTab) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {/* rank tabs */}
      <div className="sticky top-0 flex gap-2 flex-row flex-wrap px-2 py-1 rounded-lg shadow-md bg-white dark:bg-[var(--card)]  border dark:border-none">
        {rankList.map((rank, index) => (
          <div
            key={`${rank.id}_${index}`}
            onClick={() => {
              // 获取当前的URL
              var currentURL = window.location.href;
              console.log(currentURL);
              
              // 新的URL
              var newURL = `${location.protocol}://${location.host}/tabs/${rank.id}`;

              // 使用pushState改变URL，但不刷新页面
              window.history.pushState({ path: newURL }, "", newURL);

              // 监听popstate事件，当用户点击浏览器的前进或后退按钮时触发
              window.addEventListener("popstate", function (event) {
                // 恢复到先前的URL
                window.history.replaceState(
                  { path: currentURL },
                  "",
                  currentURL
                );
              });
              setActiveTab(rank);
            }}
            className={cn(
              "flex gap-2 px-2 py-1 text-sm rounded-lg cursor-pointer border hover:shadow-lg",
              activeTab.id == rank.id && "text-red-600 dark:text-red-600"
            )}>
            <Image src={`/${rank.source}.ico`} alt="" width={20} height={20} />
            <span className="flex-shrink-0">{rank.name}</span>
          </div>
        ))}
      </div>
      {/* rank card */}
      <Card className="border shadow-none  border-slate-100 dark:border-slate-100 dark:border-none">
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
            <div className="text-sm">共 {rankData.length} 条</div>
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadData ? (
            <SkeletonBar rowNum={20} />
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
