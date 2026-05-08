"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type ActiveTab = "dashboard" | "themes" | "portfolio" | "brief";

interface WfHeaderProps {
  active?: ActiveTab;
  dense?: boolean;
}

const TABS: Array<{ id: ActiveTab; label: string; href: string }> = [
  { id: "dashboard",  label: "Dashboard",     href: "/" },
  { id: "themes",     label: "Themes",         href: "/themes" },
  { id: "portfolio",  label: "Portfolio",      href: "/portfolio" },
  { id: "brief",      label: "Today's Brief",  href: "/" },
];

function formatET(): string {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const month = get("month").toUpperCase();
  const day   = get("day");
  const hour  = get("hour");
  const min   = get("minute");
  return `${month} ${day} · ${hour}:${min} ET`;
}

export function WfHeader({ active = "dashboard", dense = false }: WfHeaderProps) {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    setTimeStr(formatET());
    const id = setInterval(() => setTimeStr(formatET()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: dense ? "10px 20px" : "14px 24px",
        borderBottom: "1.5px solid var(--line)",
        background: "var(--bg)",
        gap: 16,
      }}
    >
      {/* left: brand + tabs */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="brand" style={{ fontSize: 18, letterSpacing: "-0.03em" }}>
            In<span className="dot">·</span>Vest
          </div>
        </Link>
        <div style={{ display: "flex", gap: 18 }}>
          {TABS.map((t) => (
            <Link key={t.id} href={t.href} style={{ textDecoration: "none" }}>
              <div
                className="label"
                style={{
                  fontSize: 11,
                  color: t.id === active ? "var(--ink)" : "var(--muted-ink)",
                  borderBottom:
                    t.id === active
                      ? "1.5px solid var(--ink)"
                      : "1.5px solid transparent",
                  paddingBottom: 4,
                }}
              >
                {t.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* right: schwab status + live clock + avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="label" style={{ fontSize: 10 }}>SCHWAB · LIVE</div>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--bull)",
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--muted-ink)",
            minWidth: 120,
          }}
        >
          {timeStr}
        </div>
        <div
          className="box"
          style={{
            width: 26,
            height: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
          }}
        >
          JD
        </div>
      </div>
    </div>
  );
}
