import { Chip } from "@/components/common";
import { CategoryType, ItemStatus } from "@/types";
import { getItemCategoryLabel, getItemStatusLabel } from "@/utils";

interface PostChipSectionProps {
  chipData: {
    itemStatus: ItemStatus;
    category: CategoryType;
  };
}

const PostChipSection = ({ chipData }: PostChipSectionProps) => {
  const { itemStatus, category } = chipData;

  return (
    <div className="flex gap-2">
      <Chip type="brandSubtle" label={getItemStatusLabel(itemStatus)} />
      <Chip type="neutralStrong" label={getItemCategoryLabel(category)} />
    </div>
  );
};

export default PostChipSection;
