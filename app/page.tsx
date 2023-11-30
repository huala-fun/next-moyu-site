"use client";
import { useEffect, useState } from "react";
import { GridView } from "@/components/rank/grid-view";
import { getRankList } from "@/lib/store";

const fetchRankData = async (index: number) => {
  try {
    const res = await fetch(`/api/hot-rank?id=${index}`);
    const { code, data } = await res.json();
    return code === 1 ? data : [];
  } catch (error) {
    console.error("Failed to fetch rank data:", error);
    return [];
  }
};

export default function HotRank() {
  const [hotRankData, setHotRankData] = useState<Rank[]>([]);

  useEffect(() => {
    const initialRankList = getRankList();
    const list = initialRankList.map((item: any) => ({
      ...item,
      data: [],
      isLoadData: true,
    }));

    setHotRankData(list);

    const fetchDataForAllRanks = async () => {
      const dataPromises = list.map((item: any) => fetchRankData(item.id));
      const rankDataResults = await Promise.all(dataPromises);
      setHotRankData((prev: Rank[]) =>
        prev.map((rank: Rank, index: number) => ({
          ...rank,
          data: rankDataResults[index],
          isLoadData: false,
        }))
      );
    };

    fetchDataForAllRanks();
  }, []);

  return <GridView rankList={hotRankData} setHotRankData={setHotRankData} />;
}
