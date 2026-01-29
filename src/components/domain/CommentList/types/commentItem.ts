export interface Comment {
  id: number;
  author: string;
  authorImage?: string;
  date: string;
  content: string;
  replyTo?: string;
}
