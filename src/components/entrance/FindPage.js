import React from "react";
import { useState } from "react";
import { Space, Card, Button, Input } from "antd";
import "./EntrancePage.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
const gridStyle = {
  width: "50%",
  textAlign: "center",
};
const EMAIL_REST_API = "http://localhost:8080/api-email";
const FindPage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [studentId, setStudentId] = useState("");
  const toPrev = () => {
    navigate("/entrance"); // 로그인 화면으로 이동
  };
  const sendNewPw = () => {
    axios
      .post(
        `${EMAIL_REST_API}/emailSendPw`,
        { id: id },
        {
          header: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
        if (!res.data) {
          // 해당 아이디의 사용자가 없음
          Swal.fire({
            title:
              "등록되지 않은 사용자입니다. \n  아이디를 다시 확인해주세요!",
            icon: "error",
            iconColor: "#ef404a",
            confirmButtonText: "확인",
            confirmButtonColor: "#148cff",
          });
        } else {
          Swal.fire({
            icon: "success",
            iconColor: "#80b463",
            text: "메일로 새 비밀번호가 전송되었습니다. 확인 후 로그인을 진행해주세요. 로그인 후 [마이페이지]에서 비밀번호를 다시 설정할 수 있습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#148cff",
          });
          navigate("/entrance"); // 로그인 화면으로 이동
        }
      });
  };
  const sendStudentId = () => {
    axios
      .post(
        `${EMAIL_REST_API}/emailSendId`,
        { studentId: studentId },
        {
          header: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
        if (!res.data) {
          // 해당 아이디의 사용자가 없음
          Swal.fire({
            title: "등록되지 않은 사용자입니다. \n  학번을 다시 확인해주세요!",
            icon: "error",
            iconColor: "#ef404a",
            confirmButtonText: "확인",
            confirmButtonColor: "#148cff",
          });
        } else {
          Swal.fire({
            icon: "success",
            iconColor: "#80b463",
            text: "메일로 아이디가 전송되었습니다. 확인 후 로그인을 진행해주세요. 로그인 후 [마이페이지]에서 비밀번호를 다시 설정할 수 있습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#148cff",
          });
          navigate("/Entrance"); // 로그인 화면으로 이동
        }
      });
  };
  return (
    <div className="Entrance">
      <div className="Ganpan"><Link to='/entrance'>YangKids</Link></div>
      <Card
        bordered={false}
        style={{
          width: "70%",
          textAlign: "center",
        }}
      >
        <Card.Grid hoverable={false} style={gridStyle}>
          <Card title="🆔아이디 찾기🆔" bordered={false}>
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <Input
                placeholder="회원가입 시 사용한 학번을 입력하세요."
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <Button
                htmlType="button"
                type="primary"
                block
                ghost
                onClick={sendStudentId}
              >
                아이디 찾기
              </Button>
            </Space>
          </Card>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <Card title="🔐비밀번호 찾기🔐" bordered={false}>
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <Input
                placeholder="회원가입 시 사용한 아이디를 입력하세요."
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <Button
                htmlType="button"
                type="primary"
                block
                ghost
                onClick={sendNewPw}
              >
                새로운 비밀번호 발급받기
              </Button>
            </Space>
          </Card>
        </Card.Grid>
        <Button
          type="primary"
          onClick={toPrev}
          style={{ margin: "auto", marginTop: 10, marginBottom: 10 }}
        >
          이전으로
        </Button>
      </Card>
    </div>
  );
};
export default FindPage;
