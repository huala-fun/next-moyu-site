import { NextResponse } from "next/server";
import * as rank from "@/lib/rank/tieba"


export const GET = async () => {
  const res = await rank.rank();

  return NextResponse.json({
    data: res,
    code: 1,
  });
};
