import React from "react";
import "./BoardPage.css";
import BoardArticleList from "./BoardArticleList";

const InfoBoard = () => {
  return (
      <div className="BoardBox">
          <h3 style={{textAlign : 'center'}}>정보공유게시판</h3>
          <div className="Description">꿀팁내놔 꿀팁. 채용정보, 공모전 등등 이것저것 다 내놔</div>
            <BoardArticleList boardId={3}/>
      </div>
  );
};

export default InfoBoard;
