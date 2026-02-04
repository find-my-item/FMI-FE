"use client";

import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { Icon } from "@/components/common";
import { DetailHeader } from "@/components/layout";
import { cn } from "@/utils";

const isAdmin = true;

const page = () => {
  const params = useParams();

  const reportsType = params.reportsType;
  console.log("reportsType", reportsType);
  const id = params.id;
  console.log("id", id);

  if (reportsType !== "report" && reportsType !== "inquiry") return notFound();

  return (
    <>
      <DetailHeader title="신고/문의 내역" />
      <h1 className="sr-only">신고/문의 상세</h1>

      <div className="h-base">
        <section aria-label="신고/문의 내용" className="space-y-[14px] px-5 py-[30px]">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1">
              접수 <Icon name="ArrowDown" size={10} />
            </button>
            <span>답변 완료</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              {/* TODO(지권): 디자인 토큰 누락 */}
              <h2 className="text-[20px] font-semibold text-layout-header-default">
                실제 분실물/습득물이 아닌 내용이에요.
              </h2>
              <div className="flex items-center gap-2 text-body2-regular text-layout-body-default">
                <span className="block after:mx-2 after:content-['·']">닉네임최대열글자확인</span>
                <time dateTime="2025-05-06">2025.05.06</time>
              </div>
            </div>

            <p className="text-body1-regular text-layout-header-default">
              여기에 신고 내용이 표기됩니다.
            </p>
          </div>
        </section>

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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,
                  consequuntur consequatur ducimus amet aliquid culpa.
                </p>
              </article>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default page;
