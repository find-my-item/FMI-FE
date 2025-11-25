"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTab, AlertCategory, AlertView } from "./_components";
import { ALERT_TABS } from "./_constants/ALERT_TABS";
import { ALERT_CATEGORIES } from "./_constants/ALERT_CATEGORIES";
import { MOCK_ALERT_ITEMS } from "./_constants/MOCK_ALERT_ITEMS";

type AlertTabKey = (typeof ALERT_TABS)[number]["key"];
type AlertCategoryKey = (typeof ALERT_CATEGORIES)[number]["key"];

const CATEGORY_TO_KEY_MAP: Record<string, AlertCategoryKey> = {
  전자기기: "categoryKeyword",
  "즐겨찾기한 게시글의 상태": "categoryKeyword",
  "확인하지 않은 채팅": "chat",
  "새로운 채팅": "chat",
  "새로운 댓글": "comment",
};

const Alert = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") as AlertTabKey | "all";
  const category = searchParams.get("category") as AlertCategoryKey | "all";
  const [selectedTab, setSelectedTab] = useState<AlertTabKey>(tab);
  const [selectedCategory, setSelectedCategory] = useState<AlertCategoryKey>(category);

  useEffect(() => {
    setSelectedTab(tab);
    setSelectedCategory(category);
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    return MOCK_ALERT_ITEMS.filter((item) => {
      const tabMatch =
        selectedTab === "all" ||
        (selectedTab === "unread" && !item.isRead) ||
        (selectedTab === "read" && item.isRead);

      const itemCategoryKey = CATEGORY_TO_KEY_MAP[item.category];
      const categoryMatch = selectedCategory === "all" || itemCategoryKey === selectedCategory;

      return tabMatch && categoryMatch;
    });
  }, [selectedTab, selectedCategory]);

  return (
    <>
      <AlertTab />
      <AlertCategory />
      <AlertView items={filteredItems} />
    </>
  );
};

const AlertPage = () => {
  return (
    <Suspense fallback="">
      <Alert />
    </Suspense>
  );
};

export default AlertPage;
