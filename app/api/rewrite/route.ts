import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ message: "AI 리라이팅이 준비되었습니다!", data });
}
