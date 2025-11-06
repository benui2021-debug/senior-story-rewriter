// app/api/rewrite/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // TODO: 여기서 Anthropic(Claude) 호출 로직을 넣으세요.
    // 지금은 동작 확인용으로 그대로 돌려줍니다.
    return NextResponse.json({
      ok: true,
      message: 'API is alive',
      received: body,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'unknown' }, { status: 500 });
  }
}
