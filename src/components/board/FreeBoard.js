import React from "react";
import "./BoardPage.css";
import BoardArticleList from "./BoardArticleList";

const FreeBoard = () => {
  return (
      <div className="BoardBox">
        <div>
          <h3 style={{textAlign : 'center'}}>자유게시판</h3>
          <div className="Description">
여러분의 진솔한 이야기, 알리고 싶은 이야기를 자유롭게 게시해주세요!</div>
            <BoardArticleList/>
        </div>
      </div>
  );
};

export default FreeBoard;
