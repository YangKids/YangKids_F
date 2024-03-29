import { Article } from "./types";

export const articleDummy : Article = {
  boardId : 1,
  articleId: 0,
  regDate: "Feburary 5, 2024 08:24:00",
  commentCnt: 0,
  content: "게시글 상세0",
  likeCnt: 0,
  title: "게시글0",
  viewCnt: 0,
  isAnonymous : 0,
  writerName : "정재웅"
};

export const articleListDummy : Article[] = [
    {
        boardId : 1,
        articleId: 0,
        regDate: "Feburary 5, 2024 08:24:00",
        commentCnt: 0,
        content: "로딩중...",
        likeCnt: 0,
        title: "게시글을 가져오는 중입니다...",
        viewCnt: 0,
        isAnonymous : 0,
        writerName : "정재웅"
      },
      {
        boardId : 1,
        articleId: 1,
        regDate: "Feburary 5, 2024 08:24:00",
        commentCnt: 0,
        content: "로딩중...",
        likeCnt: 0,
        title: "게시글을 가져오는 중입니다...",
        viewCnt: 0,
        isAnonymous : 0,
        writerName : "정재웅"
      },
      {
        boardId : 1,
        articleId: 2,
        regDate: "Feburary 5, 2024 08:24:00",
        commentCnt: 0,
        content: "로딩중...",
        likeCnt: 0,
        title: "게시글을 가져오는 중입니다...",
        viewCnt: 0,
        isAnonymous : 0,
        writerName : "정재웅"
      } 
]


export const NoticeListDummy : Article[] = [
  {
    boardId : 0,
      articleId: 3,
      regDate: "Feburary 5, 2024 08:24:00",
      commentCnt: 0,
      content: "로딩 중...",
      likeCnt: 0,
      title: "공지를 가져오는 중입니다...",
      viewCnt: 0,
      isAnonymous : 0,
      writerName : "정재웅"
    },
    {
      boardId : 0,
      articleId: 4,
      regDate: "Feburary 5, 2024 08:24:00",
      commentCnt: 0,
      content: "로딩 중...",
      likeCnt: 0,
      title: "공지를 가져오는 중입니다...",
      viewCnt: 0,
      isAnonymous : 0,
      writerName : "정재웅"
    },
]