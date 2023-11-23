import AcfunRank from "@/lib/rank/acfun";
import PengpaiRank from "@/lib/rank/pengpai";
import QQNewsRank from "@/lib/rank/qqnews";
import SinaRank from "@/lib/rank/sina";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await SinaRank();
  return NextResponse.json({
    data: res,
    code: 1,
  });
};
