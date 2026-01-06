import "@testing-library/jest-dom";
import React from "react";

jest.mock("swiper/react", () => ({
  Swiper: ({ children }: any) => React.createElement("div", { "data-testid": "swiper" }, children),

  SwiperSlide: ({ children }: any) =>
    React.createElement("div", { "data-testid": "swiper-slide" }, children),
}));

jest.mock("swiper/modules", () => ({
  Pagination: {},
}));

jest.mock("swiper/css", () => ({}));
jest.mock("swiper/css/pagination", () => ({}));
