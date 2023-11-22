"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default () => {
  const [hotRankData, setHotRankData] = useState<Rank[]>([]);

  useEffect(() => {
    fetch("/api/hot-rank")
      .then((res) => res.json())
      .then(({ code = 0, data = [] }) => {
        if (code === 1) {
          setHotRankData(data);
        }
      });
  }, []);

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {hotRankData.map((item) => (
        <Card key={item.id}>
          <CardHeader className="p-4 pb-2">
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pr-2 pt-2">
            <ScrollArea className="h-[300px] pr-4">
              <ul>
                {item.data.map((item, index) => (
                  <Link href={item.link} target="_blank">
                    <li className="flex gap-1 justify-between hover:bg-gray-200 hover:rounded-sm px-1 hover:cursor-pointer">
                      <div className="inline-flex gap-1">
                        <span
                          className={cn(
                            "flex-shrink-0 text-sm",
                            index === 0
                              ? "text-red-500"
                              : index === 1
                              ? "text-orange-500"
                              : index === 2
                              ? "text-yellow-500"
                              : ""
                          )}>
                          {index + 1}.
                        </span>
                        <span className="text-sm">{item.title}</span>
                      </div>
                      <span className="flex-shrink-0 text-xs">
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
  );
};
