import { GetProp, UploadProps } from "antd";

export type DeviceType = "web" | "smallMobile" | "mobile";
export type Tab = undefined | 0 | 1 | 2 | 3 | 4;
export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export interface User {
  isAdmin: Number;
}
export interface Article {
  boardId: Number;
  articleId: Number;
  regDate: string;
  viewCnt: Number;
  likeCnt: Number;
  commentCnt: Number;
  img?: string;
  title: string;
  writerName: string;
  writerImg?: string;
  content: string;
  isAnonymous: Number;
}

export interface Quotation {
  content: string;
}
