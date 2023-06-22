import React from "react";
import LoginForm from "../login/LoginForm";
import { Card } from "antd";
import "./EnterancePage.css";
import { useNavigate } from "react-router-dom";

const EnterancePage = () => {
  const navigate = useNavigate();
  return (
    <div className="Enterance">
      <div className="Ganpan">YangKids</div>
      <Card
        title="로그인"
        bordered={false}
        style={{
          width: 400,
          textAlign: "center",
        }}
      >
        <LoginForm></LoginForm>
        <div>아이디 찾기 | 비밀번호 찾기 | 회원가입</div>
      </Card>
    </div>
  );
};
export default EnterancePage;