import { toReportItemVM, toInquiryItemVM, toGuestInquiryItemVM } from "./toReportsItemVM";
import {
  ProcessStatusBadgeConfig,
  ReplyStatusBadgeConfig,
} from "../AdminStatusBadgeConfig/AdminStatusBadgeConfig";

describe("toReportItemVM", () => {
  it("게시글 신고 매핑", () => {
    const item = {
      id: 1,
      title: "게시글 신고",
      content: "스팸",
      writerNickname: "짱구",
      createdAt: "2026-01-01",
      status: "PENDING",
    } as any;

    const result = toReportItemVM(item);

    expect(result).toEqual({
      href: "/admin/reports/report/1",
      title: "게시글 신고",
      content: "스팸",
      nickname: "짱구",
      createdAt: "2026-01-01",
      processStatus: ProcessStatusBadgeConfig.PENDING,
      answerStatus: ReplyStatusBadgeConfig(false),
    });
  });
});

describe("toInquiryItemVM", () => {
  it("문의 매핑", () => {
    const item = {
      id: 10,
      title: "로그인 문의",
      content: "",
      writerNickname: "유리",
      createdAt: "2026-01-02",
      status: "ANSWERED",
    } as any;

    const result = toInquiryItemVM(item);

    expect(result).toEqual({
      href: "/admin/reports/inquiry/10",
      title: "로그인 문의",
      content: "",
      nickname: "유리",
      createdAt: "2026-01-02",
      processStatus: ProcessStatusBadgeConfig.ANSWERED,
      answerStatus: ReplyStatusBadgeConfig(false),
    });
  });
});

describe("toGuestInquiryItemVM", () => {
  it("비회원 문의 매핑", () => {
    const item = {
      inquiryId: 5,
      title: "비회원 문의",
      content: "문의 내용",
      userEmail: "test@test.com",
      createdAt: "2026-01-03",
      status: "PENDING",
    } as any;

    const result = toGuestInquiryItemVM(item);

    expect(result).toEqual({
      href: "/admin/guest-inquiries/5",
      title: "비회원 문의",
      content: "문의 내용",
      nickname: "test@test.com",
      createdAt: "2026-01-03",
      processStatus: ProcessStatusBadgeConfig.PENDING,
      answerStatus: ReplyStatusBadgeConfig(false),
    });
  });
});
