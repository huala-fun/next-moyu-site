import { useEffect, useState } from "react";
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
import { rankList } from "@/lib/rank";

export default async function HotRank() {
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
              {rankList.map(({ meta }, index) => {
                return (
                  <div
                    key={index}
                    className=" flex-shrink-0 flex gap-2 items-center">
                    <Image
                      src={`/${meta.source}.ico`}
                      alt=""
                      width={20}
                      height={20}
                    />{" "}
                    {meta.name}
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
