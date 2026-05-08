import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Personal investment thesis tracker. Schwab portfolio + Claude-assisted
          weekly theme reviews.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link href="/themes">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader>
              <CardTitle>Themes</CardTitle>
              <CardDescription>
                Author and track investment theses. Claude updates them weekly.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/portfolio">
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>
                Live positions pulled from Schwab.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </section>

      <section className="rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Scaffold-only build</p>
        <p>
          Schwab and Claude integrations are stubbed. See
          <code className="mx-1 rounded bg-background px-1">README.md</code>
          for what&apos;s wired up and what&apos;s next.
        </p>
      </section>
    </div>
  );
}
