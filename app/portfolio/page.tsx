import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
        <p className="text-muted-foreground">
          Positions pulled from your Schwab account.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Schwab not connected</CardTitle>
          <CardDescription>
            OAuth flow ships in the next iteration.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Once connected, this view will show holdings, market value, and
          cost-basis for each position, snapshotted to Supabase.
        </CardContent>
      </Card>
    </div>
  );
}
