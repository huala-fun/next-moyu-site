import { WeiboRank, ZhihuRank } from "@/lib/rank";
import BiliBiliRank from "@/lib/rank/bilibili";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await ZhihuRank();

  const weibo = await WeiboRank();

  const bilibili = await BiliBiliRank();

  return NextResponse.json({
    data: [res, weibo, bilibili],
    code: 1,
  });
};
