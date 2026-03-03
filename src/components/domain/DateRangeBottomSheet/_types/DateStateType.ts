export interface ActivityFilterType {
  date: string;
  filter: ActivityType | undefined;
}

type ActivityType = "POST" | "COMMENT" | "FAVORITE" | "INQUIRY" | "REPORT";
