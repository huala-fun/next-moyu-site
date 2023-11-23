import DouyinSocialRank from "@/lib/rank/douyin";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await DouyinSocialRank();
  return NextResponse.json({
    data: res,
    code: 1,
  });
};
