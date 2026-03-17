import { InquiryType } from "@/types";

interface PostInquiryData {
  title: string;
  content: string;
  inquiryType: InquiryType;
  email: string;
}

export interface PostInquiryRequest {
  request: PostInquiryData;
  images?: File[];
}
