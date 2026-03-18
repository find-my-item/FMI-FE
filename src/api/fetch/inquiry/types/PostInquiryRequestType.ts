import { InquiryTargetType } from "@/types";

interface PostInquiryData {
  title: string;
  content: string;
  inquiryType: InquiryTargetType;
  email: string;
}

export interface PostInquiryRequest {
  inquiry: PostInquiryData;
  images?: File[];
}
