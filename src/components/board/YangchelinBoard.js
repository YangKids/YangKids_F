import React from "react";
import "./BoardPage.css";
import BoardArticleList from "./BoardArticleList";

const YangchelinBoard = () => {
  return (
      <div className="BoardBox">
        <div>
          <h3 style={{textAlign : 'center'}}>양슐랭가이드</h3>
          <div className="Description">샤로수길 정통집 개맛있음. 배고프다 먹고싶다. </div>
            <BoardArticleList/>
        </div>
      </div>
  );
};

export default YangchelinBoard;
