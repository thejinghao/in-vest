import { type ReactNode } from "react";

type BadgeVariant = "bull" | "bear" | "flat" | "warn" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  style?: React.CSSProperties;
}

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  bull: "badge badge-bull",
  bear: "badge badge-bear",
  flat: "badge badge-flat",
  warn: "badge badge-warn",
  default: "badge",
};

export function Badge({ variant = "default", children, style }: BadgeProps) {
  return (
    <span className={VARIANT_CLASS[variant]} style={style}>
      {children}
    </span>
  );
}
