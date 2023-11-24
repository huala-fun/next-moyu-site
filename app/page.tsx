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
import { RankSkeleton } from "@/components/rank/rank-skeleton";
import RankView from "@/components/rank/rank-item";
import { TabsView } from "@/components/rank/tabsView";
import { GridView } from "@/components/rank/grid-view";

export default function HotRank() {
  const [hotRankData, setHotRankData] = useState<Rank[]>([]);
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
    <>
      <GridView rankList={hotRankData} setHotRankData={setHotRankData} />
      <TabsView rankList={hotRankData} setHotRankData={setHotRankData} />
    </>
  );
}
