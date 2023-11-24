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
import { isMobile } from "react-device-detect";


const fetchHotRankMetaList = async () => {
  const res = await fetch("/api/hot-rank/list");
  const { code, data } = await res.json();
  return code === 1
    ? data.map((item: Rank) => ({ ...item, data: [], isLoadData: true }))
    : [];
};

const fetchRankData = async (index: number) => {
  const res = await fetch(`/api/hot-rank?id=${index}`);
  const { code, data } = await res.json();
  return code === 1 ? data : [];
};

export default function HotRank() {
  const [hotRankData, setHotRankData] = useState<Rank[]>([]);
  const [isLoadRankMeta, setIsLoadRankMeta] = useState<boolean>(false);

  useEffect(() => {
    const handleLoadRankData = async () => {
      const initialData = await fetchHotRankMetaList();
      setHotRankData(initialData);
      setIsLoadRankMeta(true);
    };
    handleLoadRankData();
  }, []);

  useEffect(() => {
    const fetchDataForAllRanks = async () => {
      await Promise.all(
        hotRankData.map(async (rank, index) => {
          const data = await fetchRankData(index);
          setHotRankData((prev) => {
            const temp = [...prev];
            temp[index].data = data;
            temp[index].isLoadData = false;
            return temp;
          });
        })
      );
    };
    fetchDataForAllRanks();
  }, [isLoadRankMeta]);

  return isMobile ? (
    <TabsView rankList={hotRankData} setHotRankData={setHotRankData} />
  ) : (
    <GridView rankList={hotRankData} setHotRankData={setHotRankData} />
  );
}
