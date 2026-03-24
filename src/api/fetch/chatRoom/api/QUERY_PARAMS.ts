const toApiType = (raw: string | null): "ALL" | "LOST" | "FOUND" => {
  const v = (raw ?? "").toLowerCase();
  if (v === "lost") return "LOST";
  if (v === "found") return "FOUND";
  return "ALL";
};

const toApiSort = (raw: string | null): "LATEST" | "OLDEST" => {
  const v = (raw ?? "").toLowerCase();
  if (v === "oldest") return "OLDEST";
  return "LATEST";
};

const QUERY_PARAMS = {
  type: {
    key: "type",
    transform: toApiType,
  },
  address: {
    key: "region",
    transform: (raw: string | null) => raw || "",
  },
  sort: {
    key: "sort",
    transform: toApiSort,
  },
} as const;

export default QUERY_PARAMS;
