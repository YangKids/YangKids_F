import React from "react";
import LoginForm from "../login/LoginForm";
import { HeartTwoTone } from '@ant-design/icons';
import { Card, Button } from "antd";
import "./EnterancePage.css";
import { Link } from "react-router-dom";

const EnterancePage = () => {
  return (
    <div className="Enterance">
      <div className="Ganpan">YangKids</div>
      <Card
        title="로그인"
        bordered={false}
        style={{
          width: 400,
          textAlign: "center",
          marginTop: "100px"
        }}
      >
        <LoginForm></LoginForm>
        <div>
          <span style={{margin:"15px"}}>
          <HeartTwoTone twoToneColor="#eb2f96" />
          <Link to='/Find' style={{color : 'black'}}> 아이디 / 비밀번호 찾기</Link>
          </span>
          <span style={{margin:"15px"}}>
          <HeartTwoTone twoToneColor="#eb2f96" />
          <Link to='/Signup' style={{color : 'black'}}> 회원가입 </Link>
          </span>
        </div>
      </Card>
    </div>
  );
};
export default EnterancePage;