export type DeviceType = "web" | "smallMobile" | "mobile";

export interface Article {
    boardId : Number
    articleId : Number;
    regDate : string;
    viewCnt : Number;
    likeCnt : Number;
    commentCnt : Number;
    img? : string;
    title : string;
    writerName : string;
    writerImg? : string;
    content : string;
    isAnonymous : Number;
    
}

export interface Quotation {
    content : string;
}