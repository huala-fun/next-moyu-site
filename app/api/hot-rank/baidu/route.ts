import PengpaiRank from "@/lib/rank/pengpai";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await PengpaiRank();
  return NextResponse.json({
    data: res,
    code: 1,
  });
};
