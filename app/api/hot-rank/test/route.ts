import { NextResponse } from "next/server";
import * as rank from "@/lib/rank/kuaishou"


export const GET = async () => {
  const res = await rank.Rank();

  return NextResponse.json({
    data: res,
    code: 1,
  });
};
