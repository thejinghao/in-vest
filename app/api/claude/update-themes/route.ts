import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "not_implemented",
      message:
        "Weekly theme update flow is stubbed. The Claude client lives at lib/ai/gateway.ts; wire it up here when ready.",
    },
    { status: 501 },
  );
}
