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
        <div className="ExplainText">
          삐용삐용 알람 <br />
          알람을 확인하고 답글을 달아보세요.
        </div>
      </div>

      <div className="AlarmBox">
        <AlarmList></AlarmList>
      </div>
    </div>
  );
};

export default AlarmPage;
