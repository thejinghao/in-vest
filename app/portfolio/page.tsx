import { WfHeader } from "@/components/wireframe/WfHeader";

export default function PortfolioPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <WfHeader active="portfolio" />
      <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>Portfolio</div>
          <div className="label" style={{ marginTop: 4 }}>LIVE SCHWAB DATA · NOT YET CONNECTED</div>
        </div>
        <div className="box-dashed slab" style={{ height: 200 }}>
          SCHWAB OAUTH NOT YET CONFIGURED
        </div>
      </div>
    </div>
  );
}
