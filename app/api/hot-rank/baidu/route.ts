import { NextResponse } from "next/server";
import * as piyao from "@/lib/rank/piyao"


export const GET = async () => {
  const res = await piyao.Rank();

  return NextResponse.json({
    data: res,
    code: 1,
  });
};
