"use client";
import { useEffect, useState } from "react";
import { TabsView } from "@/components/rank/tabsView";
import { GridView } from "@/components/rank/grid-view";

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

  return <GridView rankList={hotRankData} setHotRankData={setHotRankData} />;
}
