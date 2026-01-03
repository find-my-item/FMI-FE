"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./swiper-pagination.css";

interface ImageSectionProps {
  imageUrls: string[];
}

const ImageSection = ({ imageUrls }: ImageSectionProps) => {
  return (
    <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
      {imageUrls.map((url, index) => (
        <SwiperSlide key={index}>
          <Image
            src={url}
            alt={`게시글 이미지 ${index + 1}`}
            width={390}
            height={260}
            draggable={false}
            priority
            className="h-[260px] w-[390px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSection;
