import { Chip } from "@/components";
import { CategoryType } from "@/types";
import { ItemStatus } from "@/api/fetch/post";
import { getItemCategoryLabel, getItemStatusLabel } from "@/utils";

type ChipData = {
  itemStatus: ItemStatus;
  category: CategoryType;
};

const PostChipSection = ({ itemStatus, category }: ChipData) => {
  return (
    <div className="flex gap-2">
      <Chip type="status" label={getItemStatusLabel(itemStatus)} />
      <Chip type="category" label={getItemCategoryLabel(category)} />
    </div>
  );
};

export default PostChipSection;
