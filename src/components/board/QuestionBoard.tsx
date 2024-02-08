import React from "react";
import "./BoardPage.css";
import BoardArticleList from "./BoardArticleList";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

const QuestionBoard = () => {
  const { deviceType } = useDeviceTypeStore();

  return (
    <div className={deviceType === "web" ? "BoardBox" : "MobileBoardBox"}>
      {deviceType === "web" ? (
        <>
          <h3 style={{ textAlign: "center" }}>질문게시판</h3>
          <div className="Description">
            아 몰랑 가르쳐줘
          </div>
          <BoardArticleList boardId={2} />
        </>
      ) : (
        <>
          <h5 style={{ marginTop: 10, marginBottom: 20 }}>질문게시판</h5>
          <div className="MobileDescription">
            아 몰랑 가르쳐줘
          </div>
          <BoardArticleList boardId={2} />
        </>
      )}
    </div>
  );
};

export default QuestionBoard;
