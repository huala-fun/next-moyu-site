"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Sortable from "sortablejs";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { BiRefresh, BiMove } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { setRankList } from "@/lib/store";

const CardSkeleton = ({ rowNum }: { rowNum: number }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Array.from({ length: rowNum }).map((_, index) => (
        <Skeleton
          key={`skeleton_${index}`}
          className="w-full h-[20px] rounded-full"
        />
      ))}
    </div>
  );
};

const handleUpdateRankById = async (
  index: number,
  id: number,
  updateRankList: any
) => {
  try {
    updateRankList((draft: any) => {
      draft[index].isLoadData = true;
    });
    const res = await fetch("/api/hot-rank?id=" + id);
    const { code = 0, data = [] } = await res.json();
    if (code == 1) {
      updateRankList((draft: any) => {
        draft[index].data = data;
      });
      toast.success("刷新成功");
    }
  } finally {
    updateRankList((draft: any) => {
      draft[index].isLoadData = false;
    });
  }
};

/**
 * grid 布局
 *
 * @param param0
 * @returns
 */
export function GridView({
  rankList,
  updateRankList,
}: {
  rankList: Rank[];
  updateRankList: any;
}) {
  const gridViewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sortableInstance = gridViewRef.current
      ? Sortable.create(gridViewRef.current, {
          draggable: ".card",
          handle: ".move",
          chosenClass: "sortable-chosen",
          ghostClass: "sortable-ghost",
          dragClass: "sortable-drag",
          forceFallback: true,
          animation: 150,
          onEnd: (evt: any) => {
            updateRankList((draft: any) => {
              const [element] = draft.splice(evt.oldIndex, 1);
              draft.splice(evt.newIndex, 0, element);
              console.log(draft);
              setRankList(draft);
              toast.success("排序成功");
            });
          },
        })
      : null;
    return () => {
      sortableInstance && sortableInstance.destroy();
    };
  }, []);
  return (
    <div
      ref={gridViewRef}
      className="grid flex-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-5">
      {rankList.map((item, index) => (
        <Card
          key={`card_${item.id}`}
          className="card border shadow-none hover:shadow-lg border-slate-100 dark:border-slate-800">
          <CardHeader className="p-3 py-2 border-b">
            <CardTitle className="flex justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={`/${item.source}.ico`}
                  alt=""
                  width={20}
                  height={20}
                />
                {!item.url ? (
                  <span className="dark:text-slate-400"> {item.name}</span>
                ) : (
                  <Link
                    target="_blank"
                    href={item.url}
                    className="dark:text-slate-400">
                    {item.name}
                  </Link>
                )}
              </div>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button className="px-0 move" variant={"link"}>
                        <BiMove className={cn("w-5 h-5")} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>拖拽排序</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="px-0"
                        variant={"link"}
                        onClick={() =>
                          handleUpdateRankById(index, item.id, updateRankList)
                        }>
                        <BiRefresh
                          className={cn(
                            "w-5 h-5",
                            item.isLoadData && "animate-spin"
                          )}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>刷新内容</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {item.isLoadData ? (
              <CardSkeleton rowNum={15} />
            ) : (
              <RankDetail rankItemList={item.data} />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * 热榜内容渲染
 * @param param0
 * @returns
 */
const RankDetail = ({ rankItemList }: { rankItemList: RankItem[] }) => {
  return (
    <div className="h-[450px] sm:h-[400px] pr-4 w-full flex flex-col gap-3 overflow-hidden hover:overflow-y-auto">
      {rankItemList.map((item, index) => (
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
  );
};
