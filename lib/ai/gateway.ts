import { gateway } from "@ai-sdk/gateway";

export const CLAUDE_MODEL = "anthropic/claude-opus-4-7";

export const claude = gateway(CLAUDE_MODEL);
