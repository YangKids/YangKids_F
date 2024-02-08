import React from "react";
import "./BoardPage.css";
import BoardArticleList from "./BoardArticleList";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

const YangchelinBoard = () => {
  const { deviceType } = useDeviceTypeStore();

  return (
    <div className={deviceType === "web" ? "BoardBox" : "MobileBoardBox"}>
      {deviceType === "web" ? (
        <>
          <h3 style={{ textAlign: "center" }}>양슐랭가이드</h3>
          <div className="Description">
            샤로수길 정통집 개맛있음. 배고프다 먹고싶다.
          </div>
          <BoardArticleList boardId={4} />
        </>
      ) : (
        <>
          <h5 style={{ marginTop: 10, marginBottom: 20 }}>양슐랭가이드</h5>
          <div className="MobileDescription">
            샤로수길 정통집 개맛있음. 배고프다 먹고싶다.
          </div>
          <BoardArticleList boardId={4} />
        </>
      )}
    </div>
  );
};

export default YangchelinBoard;
