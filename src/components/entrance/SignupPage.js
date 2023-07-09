import React from "react";
import SignupForm1 from "../login/SignupForm1";
import SignupForm2 from "../login/SignupForm2";
import { Card, Button } from "antd";
import "./EnterancePage.css";
import { Link, useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import Swal from "sweetalert2";
import axios from "axios";

const gridStyle = {
  width: "50%",
  textAlign: "center",
};
SignupForm1.propTypes = {
  id: PropTypes.string,
};
const SignupPage = () => {
  const sessionStorage = window.sessionStorage;
  const navigate = useNavigate();
  const [id, setId] = React.useState("");
  const [idcheck, setIdcheck] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailcheck, setEmailcheck] = React.useState(false);
  const [birth, setBirth] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [teacher, setTeacher] = React.useState("");
  const [campus, setCampus] = React.useState("");
  const [isEmployed, setIsEmployed] = React.useState("");
  const [fileList, setFileList] = React.useState([]);
  const [generation, setGeneration] = React.useState("");
  const [studentId, setStudentId] = React.useState("");
  const [studentIdcheck, setStudentIdcheck] = React.useState(false); // 학번 중복확인
  const signup = () => {
    if (
      id === "" ||
      password === "" ||
      name === "" ||
      phoneNumber === "" ||
      email === "" ||
      birth === "" ||
      gender === "" ||
      teacher === "" ||
      campus === "" ||
      isEmployed === "" ||
      studentId === "" ||
      generation === ""
    ) {
      Swal.fire({
        title: "필수 정보를 입력해 주세요.",
        icon: "warning",
        iconColor: "#ef404a",
        confirmButtonText: "확인",
        confirmButtonColor: "#148cff",
      });
      return;
    }
    if (idcheck === false) {
      Swal.fire({
        title: "아이디 중복확인을 진행해 주세요.",
        icon: "warning",
        iconColor: "#ef404a",
        confirmButtonText: "확인",
        confirmButtonColor: "#148cff",
      });
      return;
    }
    if (emailcheck === false) {
      Swal.fire({
        title: "이메일 인증을 진행해 주세요.",
        icon: "warning",
        iconColor: "#ef404a",
        confirmButtonText: "확인",
        confirmButtonColor: "#148cff",
      });
      return;
    }
    if (passwordCheck === false) {
      Swal.fire({
        title: "비밀번호가 일치하지 않습니다.",
        icon: "warning",
        iconColor: "#ef404a",
        confirmButtonText: "확인",
        confirmButtonColor: "#148cff",
      });
      return;
    }
    if (studentIdcheck === false) {
      Swal.fire({
        title: "학번 중복확인을 진행해 주세요.",
        icon: "warning",
        iconColor: "#ef404a",
        confirmButtonText: "확인",
        confirmButtonColor: "#148cff",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", fileList[0]);
    formData.append("id", id);
    formData.append("password", password);
    formData.append("name", generation+"기_"+name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("email", email);
    formData.append("birth", birth);
    formData.append("gender", gender);
    formData.append("teacher", teacher);
    formData.append("campus", campus);
    formData.append("isEmployed", isEmployed);
    formData.append("studentId", studentId);
    formData.append("generation", generation);
    const url = fileList.length === 0 ? "/signup/noimage" : "/signup";
    axios
      .post(`http://localhost:8080/api-user/${url}`, formData, {
        header: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data === "SUCCESS") {
          axios
            .post(
              "http://localhost:8080/api-user/login",
              new URLSearchParams({
                id: id,
                password: password,
              })
            )
            .then((response) => {
              console.log(response);
              // 로그인 성공
              if (response.data.message === "SUCCESS") {
                // sessionStorage에 로그인 사용자 정보(Object)&토큰(String) 올리기
                sessionStorage.setItem(
                  "loginUser",
                  JSON.stringify(response.data["loginUser"])
                );
                sessionStorage.setItem(
                  "access-token",
                  response.data["access-token"]
                );
                // 메인페이지로 이동
                navigate("/");
              } else {
                // 로그인 실패
                alert("로그인 화면으로 이동합니다.");
              }
            });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "회원가입에 실패하였습니다.",
          icon: "warning",
          iconColor: "#ef404a",
          confirmButtonText: "확인",
          confirmButtonColor: "#148cff",
        });
      });
  };
  return (
    <div className="Enterance">
      <div className="Ganpan"><Link to='/Enterance'>YangKids</Link></div>
      <Card
        title="회원가입"
        bordered={false}
        style={{
          width: "70%",
          textAlign: "center",
        }}
      >
        <Card.Grid hoverable={false} style={gridStyle}>
          <SignupForm1
            id={id}
            setId={setId}
            idcheck={idcheck}
            setIdcheck={setIdcheck}
            password={password}
            setPassword={setPassword}
            setPasswordCheck={setPasswordCheck}
            name={name}
            setName={setName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            email={email}
            setEmail={setEmail}
            setEmailcheck={setEmailcheck}
            setBirth={setBirth}
            gender={gender}
            setGender={setGender}
          ></SignupForm1>
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <SignupForm2
            setTeacher={setTeacher}
            setCampus={setCampus}
            isEmployed={isEmployed}
            setIsEmployed={setIsEmployed}
            fileList={fileList}
            setFileList={setFileList}
            studentId={studentId}
            setStudentId={setStudentId}
            setStudentIdcheck={setStudentIdcheck}
            generation={generation}
            setGeneration={setGeneration}
          ></SignupForm2>
        </Card.Grid>
        <Button type="primary" className="signupBtn" onClick={signup} style={{marginTop : "15px"}}>
          YangKids 회원가입
        </Button>
      </Card>
    </div>
  );
};

export default SignupPage;
