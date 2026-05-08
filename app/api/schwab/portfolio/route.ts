import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: "schwab_not_configured",
      message:
        "Schwab OAuth is not yet wired up. Configure SCHWAB_CLIENT_ID, SCHWAB_CLIENT_SECRET, SCHWAB_REDIRECT_URI and implement the client in lib/schwab/client.ts.",
    },
    { status: 501 },
  );
}
