import type { CategoryApi } from "../Types/Match";

export const formatCategoryLabel = (key: CategoryApi | string): string => {
  const map: Record<CategoryApi, string> = {
    VIP: "VIP",
    CATEGORY_1: "Category 1",
    CATEGORY_2: "Category 2",
    CATEGORY_3: "Category 3",
  };
  const k = key as CategoryApi;
  return map[k] ?? String(key);
};
