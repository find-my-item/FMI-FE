import { cn } from "@/utils";
import Image from "next/image";

const isAdmin = true;

const AdminReportsCommentSection = () => {
  return (
    <section aria-labelledby="comments-title">
      <h2 id="comments-title" className="sr-only">
        댓글
      </h2>
      <ul>
        <li>
          <article
            className={cn(
              "flex flex-col gap-2 px-5 py-9",
              isAdmin ? "bg-fill-neutral-strong-default" : "bg-white"
            )}
          >
            <div className="flex items-center gap-[14px]">
              <Image
                src={"/test_list.JPG"}
                alt="프로필 이미지"
                width={30}
                height={30}
                className="rounded-full"
              />
              <div className="flex flex-col gap-[2px]">
                <p className="text-body1-medium text-layout-header-default">찾아줘 관리자</p>
                <time className="text-body2-regular text-layout-body-default">2025.05.06</time>
              </div>
            </div>
            <p className="text-body1-regular text-layout-header-default">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, consequuntur
              consequatur ducimus amet aliquid culpa.
            </p>
          </article>
        </li>
      </ul>
    </section>
  );
};

export default AdminReportsCommentSection;
