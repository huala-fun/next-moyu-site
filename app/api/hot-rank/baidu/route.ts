import AcfunRank from "@/lib/rank/acfun";
import PengpaiRank from "@/lib/rank/pengpai";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await AcfunRank();
  return NextResponse.json({
    data: res,
    code: 1,
  });
};
