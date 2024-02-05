import React from "react";
import "./BoardPage.css";
import BoardArticleList from "./BoardArticleList";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

const FreeBoard = () => {
  const { deviceType } = useDeviceTypeStore();

  return (
    <div className={deviceType === "web" ? "BoardBox" : "MobileBoardBox"}>
      {deviceType === "web" ? (
        <>
          <h3 style={{ textAlign: "center" }}>자유게시판</h3>
          <div className="Description">
            여러분의 진솔한 이야기, 알리고 싶은 이야기를 자유롭게 게시해주세요!
          </div>
          <BoardArticleList boardId={1} />
        </>
      ) : (
        <>
          <h5 style={{ marginTop : 20, marginBottom:20}}>자유게시판</h5>
          <div className="MobileDescription">
            여러분의 진솔한 이야기, 알리고 싶은 이야기를 자유롭게 게시해주세요!
          </div>
          <BoardArticleList boardId={1} />
        </>
      )}
    </div>
  );
};

export default FreeBoard;
