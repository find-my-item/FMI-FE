"use client";

import GlassMorphism from "@/design/GlassMorphism/GlassMorphism";
import GlassMorphismButton from "@/design/GlassMorphism/GlassMorphismButton";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import Bookmark from "@/components/Bookmark/Bookmark";
import KebabMenuButton from "@/components/KebabMenuButton/KebabMenuButton";
import Location from "@/components/Location/Location";
import ViewMoreReply from "@/components/ViewMoreReply/ViewMoreReply";
import ViewMoreComment from "@/components/ViewMoreComment/ViewMoreComment";
import Filter from "@/components/Filter/Filter";
import KebabMenu from "@/components/KebabMenu/KebabMenu";
import FloatingButton from "@/components/FloatingButton/FloatingButton";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { useState } from "react";
import ToggleImageButton from "@/components/ToggleImageButton/ToggleImageButton";

const Page = () => {
  const [toggleState, setToggleState] = useState(false);
  const [imageToggleState, setImageToggleState] = useState(false);
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const kebabMenuItem = [
    {
      text: "TEXT",
      icon: { name: "Location" },
      iconPosition: "trailing",
      loading: true,
    } as const,
    {
      text: "TEXT",
      icon: { name: "ArrowDown", size: 24 },
    } as const,
    {
      text: "TEXT",
    },
  ];
  const images = [
    "https://images.mypetlife.co.kr/content/uploads/2022/12/16162807/IMG_1666-edited-scaled.jpg",
    "https://i.namu.wiki/i/slmFMXb1Fchs2zN0ZGOzqfuPDvhRS-H9eBp7Gp613-DNKi6i6Ct7eFkTUpauqv5HAYR97mrNqrvvcCDEyBdL_g.webp",
  ];
  return (
    <div className="min-h-screen bg-white p-8 transition-colors duration-200 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <h1 className="font-heading mb-6 text-4xl font-bold text-gray-900 dark:text-gray-100 tablet:mb-10">
          Design System Showcase
        </h1>
        <div className="fixed max-w-[390px] gap-2 flex-col-center">
          <GlassMorphismButton isDisabled={false}>다음</GlassMorphismButton>
          <GlassMorphismButton isDisabled={true}>대기중</GlassMorphismButton>
          <GlassMorphismButton isDisabled={true}>로그인</GlassMorphismButton>
          <GlassMorphism />
        </div>
        {/* Colors */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Colors</h2>

          {/* Example: blue scale from theme.colors.blue[100..900] */}
          <div className="md:grid-cols-5 mb-6 grid grid-cols-2 gap-4">
            {shades.map((shade) => (
              <div key={`blue-${shade}`} className={`rounded-lg p-4 bg-blue-${shade}` as const}>
                <span className="font-mono text-sm text-gray-900/80 dark:text-gray-900">
                  blue-{shade}
                </span>
              </div>
            ))}
          </div>

          {/* Teal scale */}
          <div className="md:grid-cols-5 grid grid-cols-2 gap-4">
            {shades.map((shade) => (
              <div key={`teal-${shade}`} className={`rounded-lg p-4 bg-teal-${shade}` as const}>
                <span className="font-mono text-sm text-gray-900/80 dark:text-gray-900">
                  teal-{shade}
                </span>
              </div>
            ))}
          </div>
        </section>
        <Button variant="solid" hierarchy="subtle" size="big" icon={{ name: "Logo" }}>
          찾아줘
        </Button>
        <Bookmark isActive={false} />
        <KebabMenuButton />
        <Location children="위치" disabled />
        <ViewMoreReply text="TEXT" disabled />
        <ViewMoreComment text="댓글 10개 더보기" />
        <Filter
          ariaLabel="지역 선택"
          children="TEXT"
          onSelected={false}
          iconPosition="trailing"
          icon={{ name: "ArrowDown", size: 16 }}
        />
        <KebabMenu items={kebabMenuItem} />
        <FloatingButton />
        <ToggleButton toggleState={toggleState} onClick={() => setToggleState(!toggleState)} />
        <ToggleImageButton
          images={images}
          toggleState={imageToggleState}
          gap={50}
          onClick={() => setImageToggleState(!imageToggleState)}
        />
        <div className="m-1 space-y-5 border p-1">
          <h1 className="text-title1-bold text-red-500">"폰트 적용 예시"</h1>
          <section className="flex flex-col gap-3">
            <span className="text-title1-bold">text-title1-bold</span>
            <span className="text-title1-medium">text-title1-medium</span>
            <span className="text-title1-regular">text-title1-regular</span>
          </section>
          <section className="flex flex-col gap-3">
            <span className="text-caption2-semibold">text-caption2-semibold</span>
            <span className="text-caption2-medium">text-caption2-medium</span>
            <span className="text-caption2-regular">text-caption2-regular</span>
          </section>
        </div>
        {/* Spacing (uses theme.extend.spacing xs, sm, md, lg, xl) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Spacing</h2>
          <div className="space-y-4">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <div key={size} className="flex items-center">
                <div className={`h-5 bg-blue-400 dark:bg-blue-500`} style={{ width: undefined }}>
                  {/* box purely sized by padding utility for visual width */}
                </div>
                <div className={`h-5 w-0 bg-purple-400 p-${size}`} />
                <span className="ml-2 font-mono text-gray-700 dark:text-gray-300">{`p-${size}`}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius (sm / lg / xl) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Border Radius
          </h2>
          <div className="sm:grid-cols-3 grid grid-cols-1 gap-4">
            <div className="rounded-sm bg-gray-100 p-6 dark:bg-gray-800">rounded-sm</div>
            <div className="rounded-lg bg-gray-100 p-6 dark:bg-gray-800">rounded-lg</div>
            <div className="rounded-xl bg-gray-100 p-6 dark:bg-gray-800">rounded-xl</div>
          </div>
        </section>

        {/* Opacity (low / md / high from theme.extend.opacity) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Opacity</h2>
          <div className="flex items-center gap-4">
            <div className="opacity-low h-10 w-24 rounded bg-purple-500" />
            <div className="opacity-md h-10 w-24 rounded bg-purple-500" />
            <div className="opacity-high h-10 w-24 rounded bg-purple-500" />
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">low / md / high</div>
        </section>

        {/* Typography (font families & sizes if configured) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Typography</h2>
          <div className="space-y-3">
            <p className="font-heading text-4xl text-gray-900 dark:text-gray-100">
              Heading (font-heading)
            </p>
            <p className="font-body text-base text-gray-800 dark:text-gray-200">
              Body (font-body). The quick brown fox jumps over the lazy dog.
            </p>
            <p className="tracking-increased text-gray-700 dark:text-gray-300">
              Tracking increased
            </p>
            <p className="tracking-decreased text-gray-700 dark:text-gray-300">
              Tracking decreased
            </p>
          </div>
        </section>

        {/* Buttons (accent) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-purple-400 px-6 py-2 text-white transition-opacity hover:opacity-90">
              Primary Button
            </button>
            <button className="rounded-lg border border-gray-400 px-6 py-2 text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
              Secondary Button
            </button>
          </div>
        </section>

        {/* Cards (shadow & radius demo) */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Card</h2>
          <div className="p-md rounded-lg bg-white shadow-[5px_5px_5px_3px_rgba(26,32,44,0.15),_4px_4px_5px_6px_#00000033] dark:bg-gray-800">
            <p className="text-gray-800 dark:text-gray-200">
              Custom boxShadow from theme.extend.boxShadow.default applied.
            </p>
          </div>
          <p className="bg-gray-900 p-2 text-white">test</p>
        </section>
      </div>
    </div>
  );
};

export default Page;
