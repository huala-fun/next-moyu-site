import { AllRank } from "@/lib/rank";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await AllRank();
  return NextResponse.json({
    data: res,
    code: 1,
  });
};
