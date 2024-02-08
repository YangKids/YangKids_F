import React from "react";
import "./BoardPage.css";
import NoticeList from "./NoticeList";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

const NoticeBoard = () => {
  const { deviceType } = useDeviceTypeStore();
  return (
    <div className={deviceType === "web" ? "BoardBox" : "MobileBoardBox"}>
      {deviceType === "web" ? (
        <>
          <h3 style={{ textAlign: "center" }}>공지사항</h3>
          <div className="Description">공지사항 필독!</div>
          <NoticeList boardId={0} />
        </>
      ) : (
        <>
          <h5 style={{ marginTop: 10, marginBottom: 20 }}>공지사항</h5>
          <div className="MobileDescription">공지사항 필독! </div>
          <NoticeList boardId={0} />
        </>
      )}
    </div>
  );
};

export default NoticeBoard;
