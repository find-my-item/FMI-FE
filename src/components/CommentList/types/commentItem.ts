export interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  replyTo?: string;
}
