import { ALERT_CATEGORIES } from "../_constants/ALERT_CATEGORIES";
import { ALERT_TABS } from "../_constants/ALERT_TABS";

export type AlertTabKey = (typeof ALERT_TABS)[number]["key"];
export type AlertCategoryKey = (typeof ALERT_CATEGORIES)[number]["key"];
