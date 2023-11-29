"use client";
import { useEffect, useState } from "react";
import { GridView } from "@/components/rank/grid-view";
import { rankMetaList } from "@/lib/rank";

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
    const storedRankList = localStorage.getItem("rankMetaList");
    const initialRankList = storedRankList
      ? JSON.parse(storedRankList)
      : rankMetaList;

    const list = initialRankList.map((item: any) => ({
      ...item,
      data: [],
      isLoadData: true,
    }));

    setHotRankData(list);

    const fetchDataForAllRanks = async () => {
      const dataPromises = list.map((_: any, index: number) =>
        fetchRankData(index)
      );
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
