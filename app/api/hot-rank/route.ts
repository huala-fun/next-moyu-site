import { NextRequest, NextResponse } from "next/server";
import { AllRank, Rank, rankList } from "@/lib/rank";

export const GET = async (req: NextRequest) => {
  const id = Number(req.nextUrl.searchParams.get("id"));
  const data =
    id >= 0 && id < rankList.length ? await Rank(id) : await AllRank();
  return NextResponse.json({
    data,
    code: 1,
  });
};
