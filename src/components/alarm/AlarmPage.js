import React from "react";
import "./AlarmPage.css";
import Header from "../layout/header/Header";
import AlarmList from "./AlarmList";

const AlarmPage = () => {
  return (
    <div className="Body">
      <Header />
      <div className="AlarmTitle">
        <i className="fa-solid fa-bell"></i>
        <div className="TitleText">
          알림함
          <div className="SubText">새로운 알림을 확인하세요.</div>
        </div>
      </div>

      <div className="AlarmBox">
        <AlarmList></AlarmList>
      </div>
    </div>
  );
};
export default AlarmPage;