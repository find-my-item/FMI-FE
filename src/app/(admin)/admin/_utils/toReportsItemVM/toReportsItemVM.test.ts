import { toReportItemVM, toInquiryItemVM, toGuestInquiryItemVM } from "./toReportsItemVM";
import {
  ProcessStatusBadgeConfig,
  ReplyStatusBadgeConfig,
} from "../AdminStatusBadgeConfig/AdminStatusBadgeConfig";

describe("toReportItemVM", () => {
  it("게시글 신고 매핑", () => {
    const item = {
      reportId: 1,
      targetType: "POST",
      reason: "스팸",
      reporterNickname: "짱구",
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
      answerStatus: ReplyStatusBadgeConfig.UNANSWERED,
    });
  });

  it("댓글 신고 title 분기", () => {
    const item = {
      reportId: 2,
      targetType: "COMMENT",
      reason: "욕설",
      reporterNickname: "철수",
      createdAt: "2026-01-01",
      status: "RECEIVED",
    } as any;

    const result = toReportItemVM(item);

    expect(result.title).toBe("댓글 신고");
    expect(result.processStatus).toBe(ProcessStatusBadgeConfig.RECEIVED);
  });
});

describe("toInquiryItemVM", () => {
  it("문의 매핑", () => {
    const item = {
      inquiryId: 10,
      title: "로그인 문의",
      userNickname: "유리",
      createdAt: "2026-01-02",
      status: "ANSWERED",
    } as any;

    const result = toInquiryItemVM(item);

    expect(result).toEqual({
      href: "/admin/inquiries/inquiry/10",
      title: "로그인 문의",
      content: "",
      nickname: "유리",
      createdAt: "2026-01-02",
      processStatus: ProcessStatusBadgeConfig.ANSWERED,
      answerStatus: ReplyStatusBadgeConfig.ANSWERED,
    });
  });
});

describe("toGuestInquiryItemVM", () => {
  it("비회원 문의 매핑", () => {
    const item = {
      inquiryId: 5,
      title: "비회원 문의",
      reason: "문의 내용",
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
      answerStatus: ReplyStatusBadgeConfig.UNANSWERED,
    });
  });
});
