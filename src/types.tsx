export type DeviceType = "web" | "smallMobile" | "mobile";

export interface Article {
    articleId : Number,
    img? : string
    title : string,
    content : string
}