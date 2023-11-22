import { WeiboRank, ZhihuRank } from "@/lib/rank";
import BiliBiliRank from "@/lib/rank/bilibili";
import ToutiaoRank from "@/lib/rank/toutiao";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await ZhihuRank();

  const weibo = await WeiboRank();

  const bilibili = await BiliBiliRank();

  const toutiao = await ToutiaoRank();

  return NextResponse.json({
    data: [res, weibo, bilibili, toutiao],
    code: 1,
  });
};
