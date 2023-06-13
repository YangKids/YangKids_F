import React from "react";
import "./BoardPage.css";
import BoardArticleList from "./BoardArticleList";

const YangchelinBoard = () => {
  return (
      <div className="BoardBox">
          <h3 style={{textAlign : 'center'}}>양슐랭가이드</h3>
          <div className="Description">샤로수길 정통집 개맛있음. 배고프다 먹고싶다. </div>
            <BoardArticleList boardId={4}/>
      </div>
  );
};

export default YangchelinBoard;
