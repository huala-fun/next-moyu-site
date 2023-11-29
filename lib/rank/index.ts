import * as ZhihuRank from "./zhihu";
import * as WeiboRank from "./weibo";
import * as BiliBiliRank from "./bilibili";
import * as ToutiaoRank from "./toutiao";
import * as BaiduRank from "./baidu";
import * as HupuBuxinjieRank from "./hupu";
import * as HuxiuRank from "./huxiu";
import * as DouyinHotSearchRank from "./douyin";
import * as PengpaiRank from "./pengpai";
import * as AcFun from "./acfun";
import * as QQNewsRank from "./qqnews";
import * as SinaRank from "./sina";
import * as PiyaoRank from "./piyao";
import * as TiebaRank from "./tieba";
import * as HistoryTodayRank from "./today-history";

export const rankList = [
  HistoryTodayRank,
  AcFun,
  ZhihuRank,
  WeiboRank,
  SinaRank,
  BiliBiliRank,
  ToutiaoRank,
  BaiduRank,
  TiebaRank,
  HupuBuxinjieRank,
  HuxiuRank,
  DouyinHotSearchRank,
  PengpaiRank,
  QQNewsRank,
  PiyaoRank,
];

export const rankMetaList = rankList.map((rank, index) => {
  return {
    name: rank.meta.name,
    source: rank.meta.source,
    id: index,
  };
});

export async function AllRank() {
  const data = await Promise.all(rankList.map((rank) => rank.Rank()));
  return data;
}

export async function Rank(id: number) {
  const data = await rankList[id].Rank();
  return data;
}

export { ZhihuRank, WeiboRank };
