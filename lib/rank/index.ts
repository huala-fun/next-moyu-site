import ZhihuRank from "./zhihu";
import WeiboRank from "./weibo";
import BiliBiliRank from "./bilibili";
import ToutiaoRank from "./toutiao";
import BaiduRank from "./baidu";

export const rankList = [
  ZhihuRank,
  WeiboRank,
  BiliBiliRank,
  ToutiaoRank,
  BaiduRank,
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
