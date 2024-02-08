import React from "react";
import "./BoardPage.css";
import BoardArticleList from "./BoardArticleList";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

const InfoBoard = () => {
  const { deviceType } = useDeviceTypeStore();

  return (
    <div className={deviceType === "web" ? "BoardBox" : "MobileBoardBox"}>
      {deviceType === "web" ? (
        <>
          <h3 style={{ textAlign: "center" }}>정보공유게시판</h3>
          <div className="Description">
            꿀팁내놔 꿀팁. 채용정보, 공모전 등등 이것저것 다 내놔
          </div>
          <BoardArticleList boardId={3} />
        </>
      ) : (
        <>
          <h5 style={{ marginTop: 10, marginBottom: 20 }}>정보공유게시판</h5>
          <div className="MobileDescription">
            채용공고, 공모전, 청년정책 등 유용한 정보를 공유해주세요
          </div>
          <BoardArticleList boardId={3} />
        </>
      )}
    </div>
  );
};

export default InfoBoard;
