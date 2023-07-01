import React from "react";
import "./BoardPage.css";
import NoticeList from "./NoticeList";

const NoticeBoard = () => {
  return (
      <div className="BoardBox">
          <h3 style={{textAlign : 'center'}}>공지사항</h3>
          <div className="Description">
공지사항 필독!</div>
            <NoticeList boardId={0}/>
      </div>
  );
};

export default NoticeBoard;
