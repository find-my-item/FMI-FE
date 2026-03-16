import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ActivityType } from "@/types";

export interface MypageActivityResponse extends ApiBaseResponseType<MypageActivityType> {}

export interface MypageActivityType {
  activities: ActivityGroupItemType[];
  nextCursor: number;
  hasNext: boolean;
}

export interface ActivityGroupItemType {
  date: string;
  activities: ActivityEachItemType[];
}

export interface ActivityEachItemType {
  type: ActivityType;
  id: number;
  title: string;
  content: string;
  createdAt: string;
}
// export interface MypageActivityType {
//   activities: {
//     items: ActivityGroupItemType[];
//   };
//   nextCursor: number;
//   hasNext: boolean;
// }

// export interface ActivityGroupItemType {
//   date: string;
//   activities: {
//     items: ActivityEachItemType[];
//   };
// }

// export interface ActivityEachItemType {
//   type: ActivityType;
//   id: number;
//   title: string;
//   content: string;
//   createdAt: string;
// }
