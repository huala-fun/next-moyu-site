"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";
import useHasMounted from "@/hook/use-has-mounted";
import { RankSkeleton } from "@/components/rank/skeleton";

export default function HotRank() {
  const [hotRankData, setHotRankData] = useState<Rank[]>([]);
  const handleUpdateRankById = (id: number) => {
    setHotRankData((prev) => {
      const newState = [...prev];
      newState[id].refresh = true;
      return newState;
    });
    fetch("/api/hot-rank?id=" + id)
      .then((res) => res.json())
      .then(({ code = 0, data = [] }) => {
        if (code == 1) {
          setHotRankData((prev) => {
            const newState = [...prev];
            newState[id] = data;
            return newState;
          });
        }
      })
      .finally(() => {
        setHotRankData((prev) => {
          const newState = [...prev];
          newState[id].refresh = false;
          return newState;
        });
      });
  };

  useEffect(() => {
    fetch("/api/hot-rank?id=-1")
      .then((res) => res.json())
      .then(({ code = 0, data = [] }) => {
        if (code === 1) {
          setHotRankData(data);
        }
      });
  }, []);

  return (
    <div className="flex justify-between gap-2  overflow-y-auto">
      <div className="grid flex-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-2">
        {hotRankData.length == 0
          ? Array.from({ length: 12 }).map((item, index) => (
              <RankSkeleton key={index} />
            ))
          : hotRankData.map((item, index) => (
              <Card key={item.id}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="flex gap-2 items-center">
                    <Image
                      src={`/${item.source}.ico`}
                      alt=""
                      width={20}
                      height={20}
                    />
                    <span className="dark:text-slate-400"> {item.name}</span>
                    <Button
                      variant="link"
                      size="icon"
                      className="ml-auto"
                      onClick={() => handleUpdateRankById(index)}>
                      <UpdateIcon
                        className={item.refresh ? "animate-spin" : ""}
                      />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pr-2 pt-2">
                  <ScrollArea className="h-[300px] pr-4">
                    <ul>
                      {item.data.map((item, index) => (
                        <Link key={item.id} href={item.link} target="_blank">
                          <li className="flex gap-1 justify-between prose dark:prose-invert dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-600 hover:rounded-sm px-1 hover:cursor-pointer">
                            <span className={cn("text-sm")}>
                              <span
                                className={
                                  index === 0
                                    ? "text-red-500"
                                    : index === 1
                                    ? "text-orange-500"
                                    : index === 2
                                    ? "text-yellow-500"
                                    : ""
                                }>
                                {index + 1}. &nbsp;
                              </span>
                              {item.title}
                            </span>
                            <span className="flex items-center flex-shrink-0 text-xs text-slate-400">
                              {item.heat}
                            </span>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
      </div>
      <div className="sticky top-0 hidden lg:block"></div>
    </div>
  );
}
