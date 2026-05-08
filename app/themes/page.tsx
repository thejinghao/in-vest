import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ThemesPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Themes</h1>
        <p className="text-muted-foreground">
          Investment theses you&apos;re tracking.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>No themes yet</CardTitle>
          <CardDescription>
            Theme authoring UI ships in the next iteration.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Each theme will store a hypothesis, related positions, and a rolling
          log of weekly Claude-generated updates.
        </CardContent>
      </Card>
    </div>
  );
}
