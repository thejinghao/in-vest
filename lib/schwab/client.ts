// Stubbed Schwab API client.
//
// Schwab requires OAuth via developer.schwab.com. Once approved:
//   1. Implement the OAuth authorization-code flow (redirect to /api/schwab/callback)
//   2. Persist refresh tokens in Supabase (table TBD)
//   3. Replace the stubs below with real fetches against
//      https://api.schwabapi.com/trader/v1/accounts/{accountHash}/positions

export type SchwabConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export type SchwabPosition = {
  symbol: string;
  quantity: number;
  marketValue: number;
  costBasis: number;
};

export function getSchwabConfig(): SchwabConfig | null {
  const clientId = process.env.SCHWAB_CLIENT_ID;
  const clientSecret = process.env.SCHWAB_CLIENT_SECRET;
  const redirectUri = process.env.SCHWAB_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) return null;
  return { clientId, clientSecret, redirectUri };
}

export async function fetchPositions(): Promise<SchwabPosition[]> {
  // TODO: implement real Schwab fetch
  throw new Error("Schwab client not implemented");
}
