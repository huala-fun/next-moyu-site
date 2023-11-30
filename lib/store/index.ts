import { rankMetaList } from "@/lib/rank";

export const getRankList = (): any[] => {
  const storedRankList = localStorage.getItem("rankMetaList");
  return storedRankList ? JSON.parse(storedRankList) : rankMetaList;
};

export const setRankList = (rankList: any) => {
  localStorage.setItem("rankMetaList", JSON.stringify(rankList));
};
