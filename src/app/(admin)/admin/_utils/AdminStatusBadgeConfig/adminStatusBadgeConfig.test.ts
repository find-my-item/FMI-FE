import { ProcessStatusBadgeConfig, ReplyStatusBadgeConfig } from "./AdminStatusBadgeConfig";

describe("ProcessStatusBadgeConfig", () => {
  it("PENDING config", () => {
    expect(ProcessStatusBadgeConfig.PENDING).toEqual({
      label: "접수",
      className: "text-neutral-strong-default bg-fill-neutral-strong-default",
    });
  });

  it("RECEIVED config", () => {
    expect(ProcessStatusBadgeConfig.RECEIVED).toEqual({
      label: "검토",
      className: "text-brand-normal-default bg-fill-brand-subtle-default",
    });
  });

  it("ANSWERED config", () => {
    expect(ProcessStatusBadgeConfig.ANSWERED).toEqual({
      label: "처리 완료",
      className: "text-white bg-toast",
    });
  });
});

describe("ReplyStatusBadgeConfig", () => {
  it("UNANSWERED config", () => {
    expect(ReplyStatusBadgeConfig.UNANSWERED).toEqual({
      label: "미답변",
      className: "text-neutral-strong-default bg-fill-neutral-strong-default",
    });
  });

  it("ANSWERED config", () => {
    expect(ReplyStatusBadgeConfig.ANSWERED).toEqual({
      label: "답변 완료",
      className: "text-white bg-toast",
    });
  });
});
