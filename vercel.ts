import { type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "npm run build",
  // Weekly Claude theme update — uncomment once /api/claude/update-themes is implemented.
  // crons: [{ path: "/api/claude/update-themes", schedule: "0 13 * * 1" }],
};
