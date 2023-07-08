import React from "react";
import { DatePicker, Form, Input, Radio, Button, Space } from "antd";
import Swal from "sweetalert2";
import axios from "axios";

const USER_REST_API = "http://localhost:8080/api-user";
const EMAIL_REST_API = "http://localhost:8080/api-email";

// 정규표현식
const isPW = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

const SignupForm1 = ({
  id,
  setId,
  setIdcheck,
  password,
  setPassword,
  setPasswordCheck,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  setEmailcheck,
  setBirth,
  gender,
  setGender,
}) => {
  const [idStatus, setIdStatus] = React.useState("");
  const [emailStatus, setEmailStatus] = React.useState("");
  const checkId = () => {
    if (id === "") {
      Swal.fire({
        title: "아이디를 입력해주세요.",
        icon: "warning",
        iconColor: "#ef404a",
        confirmButtonText: "확인",
        confirmButtonColor: "#148cff",
      });
      return;
    }
    if (id.length < 3 || id.length > 10) {
      Swal.fire({
        title: "아이디는 3~10글자로 입력해 주세요.",
        icon: "warning",
        iconColor: "#ef404a",
        confirmButtonText: "확인",
        confirmButtonColor: "#148cff",
      });
      return;
    }
    axios
      .get(`${USER_REST_API}/checkId`, { params: { id: id } })
      .then((res) => {
        console.log(res);
        if (res.data === "SUCCESS") {
          setIdcheck(true);
          setIdStatus("success");
          Swal.fire({
            title: "사용 가능한 아이디입니다.",
            icon: "success",
            iconColor: "#80b463",
            confirmButtonText: "확인",
            confirmButtonColor: "#148cff",
          });
        } else {
          setIdcheck(false);
          setIdStatus("warning");
          Swal.fire({
            title: "중복된 아이디입니다.",
            icon: "error",
            iconColor: "#ef404a",
            confirmButtonText: "확인",
            confirmButtonColor: "#148cff",
          });
        }
      });
  };
  const emailSend = () => {
    if (email === "") {
      Swal.fire({
        title: "이메일을 입력해주세요.",
        icon: "warning",
        iconColor: "#ef404a",
        confirmButtonText: "확인",
        confirmButtonColor: "#148cff",
      });
      return;
    }
    Swal.fire({
      icon: "info",
      title: "메일로 인증코드가 발송되었습니다. 메일함을 확인해주세요!",
      showConfirmButton: false,
      timer: 4000,
    });
    axios
      .post(
        `${EMAIL_REST_API}/emailSend`,
        { email: email },
        {
          header: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);
        Swal.fire({
          text: "메일로 받은 인증코드를 입력하세요.",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          cancelButtonText: "취소",
          confirmButtonText: "확인",
          showLoaderOnConfirm: true,
          preConfirm: (code) => {
            if (code !== res.data) {
              setEmailcheck(false);
              setEmailStatus("warning");
              Swal.showValidationMessage("인증코드가 일치하지 않습니다.");
            } else {
              return code === res.data;
            }
          },
          allowOutsideClick: () => false,
        }).then((result) => {
          if (result.isConfirmed) {
            setEmailcheck(true);
            setEmailStatus("success");
            Swal.fire({
              title: "메일 인증이 완료되었습니다.",
            });
          }
        });
      });
  };
  const onChange = (date, dateString) => {
    setBirth(dateString);
  };
  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setGender(e.target.value);
  };
  return (
    <>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="id"
          label="아이디"
          hasFeedback
          validateStatus={idStatus}
          rules={[
            {
              required: true,
              message: "아이디를 입력해 주세요.",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  (getFieldValue("id").length >= 3 &&
                    getFieldValue("id").length <= 10)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("아이디는 3~10글자로 입력해 주세요.")
                );
              },
            }),
          ]}
        >
          <Space>
            <Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="3~10글자로 입력해 주세요."
            />
            <Button htmlType="button" type="primary" ghost onClick={checkId}>
              중복확인
            </Button>
          </Space>
        </Form.Item>
        <Form.Item
          name="password"
          label="비밀번호"
          hasFeedback
          rules={[
            {
              required: true,
              message: "비밀번호를 입력하세요!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                // 유효성 만족
                if (!value || isPW.test(getFieldValue("password"))) {
                  return Promise.resolve();
                }
                // 유효성 만족하지 않음
                return Promise.reject(
                  new Error(
                    "8~16자 영문 대/소문자, 숫자, 특수문자를 최소 1개씩 포함해야 합니다."
                  )
                );
              },
            }),
          ]}
        >          
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8~16자 영문 대/소문자, 숫자, 특수문자 최소 1개씩 포함"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "비밀번호를 확인해 주세요!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  setPasswordCheck(true);
                  return Promise.resolve();
                }
                setPasswordCheck(false);
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다.")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="name"
          label="이름"
          rules={[
            {
              required: true,
              message: "이름을 입력하세요!",
            },
          ]}
        >
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="휴대폰 번호"
          rules={[
            {
              required: true,
              message: "휴대폰 번호를 입력해 주세요.",
            },
          ]}
        >
          <Input
            placeholder="'-'없이 숫자만 입력해 주세요."
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="이메일"
          validateStatus={emailStatus}
          rules={[
            {
              type: "email",
              message: "이메일 형식으로 입력해주세요.",
            },
            {
              required: true,
              message: "이메일을 입력해 주세요.",
            },
          ]}
        >
          <Space>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button htmlType="button" type="primary" ghost onClick={emailSend}>
              인증
            </Button>
          </Space>
        </Form.Item>
        <Form.Item
          name="birth"
          label="생일"
          rules={[
            {
              required: true,
              message: "생일을 입력해 주세요.",
            },
          ]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>
        <Form.Item
          name="gender"
          label="성별"
          rules={[
            {
              required: true,
              message: "성별을 선택해 주세요.",
            },
          ]}
        >
          <Radio.Group onChange={onRadioChange} value={gender}>
            <Radio value="M"> 남 </Radio>
            <Radio value="F"> 여 </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm1;
