export const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

export const pickString = (raw: unknown, key: string) =>
  isRecord(raw) && typeof raw[key] === "string" ? (raw[key] as string) : "";
