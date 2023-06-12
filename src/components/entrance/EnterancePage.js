  import React from "react";
import LoginForm from "../login/LoginForm";
import { Card } from "antd";
import "./EnterancePage.css";

const EnterancePage = () => {
  return (
    <div className="Enterance">
        <div className="Ganpan">
        YangKids
        </div>
      <Card
        title="로그인"
        bordered={false}
        style={{
          width: 400,
          textAlign : "center",
        }}
      >
        <LoginForm></LoginForm>
      </Card>

    </div>
  );
};

export default EnterancePage;
