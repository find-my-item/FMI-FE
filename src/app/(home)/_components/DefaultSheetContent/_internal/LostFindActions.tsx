import Image from "next/image";
import Link from "next/link";

const LOST_FIND_ACTIONS = [
  {
    type: "lost",
    title: "분실 신고",
    image: "/main/lost-report.svg",
  },
  {
    type: "find",
    title: "습득 신고",
    image: "/main/found-report.svg",
  },
] as const;

const LostFindActions = () => {
  return (
    <div className="flex gap-4">
      {LOST_FIND_ACTIONS.map(({ type, title, image }) => (
        <Link href={`/write/post?type=${type}`} key={type}>
          <Image src={image} alt={title} width={167} height={106} property="true" />
        </Link>
      ))}
    </div>
  );
};

export default LostFindActions;
