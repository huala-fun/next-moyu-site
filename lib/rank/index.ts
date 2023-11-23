import ZhihuRank from "./zhihu";
import WeiboRank from "./weibo";
import BiliBiliRank from "./bilibili";
import ToutiaoRank from "./toutiao";
import BaiduRank from "./baidu";
import HupuBuxinjieRank from "./hupu";
import HuxiuRank from "./huxiu";
import DouyinHotSearchRank from "./douyin";
import PengpaiRank from "./pengpai";
import AcfunRank from "./acfun";
import QQNewsRank from "./qqnews";
import SinaRank from "./sina";

export const rankList = [
  AcfunRank,
  ZhihuRank,
  WeiboRank,
  SinaRank,
  BiliBiliRank,
  ToutiaoRank,
  BaiduRank,
  HupuBuxinjieRank,
  HuxiuRank,
  DouyinHotSearchRank,
  PengpaiRank,
  QQNewsRank
];

export async function AllRank() {
  const data = await Promise.all(rankList.map((rank) => rank()));
  return data;
}

export async function Rank(id: number) {
  const data = await rankList[id]();
  return data;
}

export { ZhihuRank, WeiboRank };
