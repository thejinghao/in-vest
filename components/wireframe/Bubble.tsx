import { type ReactNode } from "react";

interface BubbleProps {
  who: "me" | "ai";
  children: ReactNode;
  thinking?: boolean;
}

export function Bubble({ who, children, thinking = false }: BubbleProps) {
  const isMe = who === "me";
  return (
    <div style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "85%",
          display: "flex",
          gap: 8,
          flexDirection: isMe ? "row-reverse" : "row",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: "var(--muted-ink)",
            marginTop: 4,
            width: 18,
            textAlign: "center",
          }}
        >
          {isMe ? "YOU" : "AI"}
        </div>
        <div
          style={{
            border: isMe ? "1px solid var(--line-soft)" : "1.5px solid var(--line)",
            background: isMe ? "var(--paper)" : "var(--bg)",
            padding: "8px 12px",
            fontSize: 12.5,
            lineHeight: 1.5,
            fontStyle: thinking ? "italic" : "normal",
            color: thinking ? "var(--muted-ink)" : "var(--ink)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
