const QUERY_PARAMS = {
  type: {
    key: "type",
    transform: (raw: string | null) => (raw === "all" ? "" : (raw as "LOST" | "FOUND") || ""),
  },
  address: {
    key: "region",
    transform: (raw: string | null) => raw || "",
  },
  sort: {
    key: "sort",
    transform: (raw: string | null) => (raw as "LATEST" | "OLDEST") || "LATEST",
  },
} as const;

export default QUERY_PARAMS;
