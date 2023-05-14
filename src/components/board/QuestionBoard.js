import React from "react";
import "./BoardPage.css";
import BoardArticleList from "./BoardArticleList";

const QuestionBoard = () => {
  return (
      <div className="BoardBox">
        <div>
          <h3 style={{textAlign : 'center'}}>질문게시판</h3>
          <div className="Description">모르는거 있으면 물어보세요. 알고 질문 답변은 플레 미만 금지.
           </div>
            <BoardArticleList/>
        </div>
      </div>
  );
};

export default QuestionBoard;
