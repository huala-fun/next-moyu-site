"use client";
import { useEffect, useState } from "react";
import { TabsView } from "@/components/rank/tabsView";
import { GridView } from "@/components/rank/grid-view";
import { isMobile } from "react-device-detect";
import Header from "@/components/home/header";

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
  return (
    <div>
      <Header />
    </div>
  );
}
