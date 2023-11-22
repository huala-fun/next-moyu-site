import { WeiboRank, ZhihuRank } from "@/lib/rank";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await ZhihuRank();

  //   const weibo = await WeiboRank();

  return NextResponse.json({
    data: [res],
    code: 1,
  });
};
