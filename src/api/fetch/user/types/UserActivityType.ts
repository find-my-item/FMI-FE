import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ActivityType } from "@/types";

export interface MypageActivityResponse extends ApiBaseResponseType<MypageActivityType> {}

export interface MypageActivityType {
  activities: ActivityItem[];
  nextCursor: number;
  hasNext: boolean;
}

export interface ActivityItem {
  items: {
    date: string;
    activities: {
      items: {
        type: ActivityType;
        id: number;
        title: string;
        content: string;
        createdAt: string;
      };
    };
  };
}
