import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Radio,
  Select,
  Space,
  Switch,
  Upload,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// 정규표현식
const isPW = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
const signout = () => {
  Swal.fire({
    html:
      "<h3>회원탈퇴는 관리자에게 문의해주세요🙏<br/>" +
      "ssafy9yangkids@gmail.com</h3>",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
};
const MyPageForm = () => {
  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(true);
  const [email, setEmail] = useState(loginUser.email);
  const [emailcheck, setEmailcheck] = useState(true);
  const [emailStatus, setEmailStatus] = useState("");
  // console.log(loginUser)

  // useEffect(()=>{
  //   setProfileImg(loginUser.img);
  // },[])
  useEffect(() => {
    setEmailcheck(false);
  }, [email]);

  const myBirth = () => {
    const arr = loginUser.birth.split("");
    if (arr[0] === "0") {
      const year = "20" + arr[0] + arr[1];
      const month = arr[2] + arr[3];
      const day = arr[4] + arr[5];
      return dayjs(new Date(year, month, day));
    } else {
      const year = "19" + arr[0] + arr[1];
      const month = arr[2] + arr[3];
      const day = arr[4] + arr[5];
      return dayjs(new Date(year, month, day));
    }
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (e.fileList.length > 1) {
      message.warning("이미지는 하나만 업로드 하세요.");
    }

    let fileList = e.fileList;
    fileList = fileList.slice(-1);

    if (Array.isArray(e)) {
      return e;
    }
    return e && fileList;
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },

    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      console.log(fileList);
      return false;
    },

    fileList,
    listType: "picture",
  };

  const onFinish = (profile) => {
    if (
      profile.phoneNumber === "" ||
      profile.email === "" ||
      profile.isEmployed === ""
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
    if (loginUser.email !== email && !emailcheck) {
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
    const formData = new FormData();
    const dateData = profile.birth.$d;
    let year = dateData.getFullYear();
    year = String(year);
    const yy = year.substring(2, 4);
    let month = String(dateData.getMonth() + 1);
    let day = String(dateData.getDate());

    if (month.length === 1) {
      month = "0" + month;
    }

    if (day.length === 1) {
      day = "0" + day;
    }

    formData.append("file", fileList[0]);
    formData.append("numId", loginUser.numId);
    formData.append("id", profile.id);
    formData.append("name", profile.name);
    formData.append("age", profile.age);
    formData.append("gender", profile.gender);
    formData.append("phoneNumber", profile.phoneNumber);
    formData.append("email", profile.email);
    formData.append("teacher", profile.teacher);
    formData.append("birth", yy + month + day);
    formData.append("isEmployed", profile.isEmployed);
    formData.append("studentId", profile.studentId);
    formData.append("campus", profile.campus);
    console.log(fileList[0]);
    const url =
      fileList.length === 0 ? "/updateUserInfo/noimage" : "/updateUserInfo";
    axios
      .put(`http://localhost:8080/api-user/${url}`, formData, {
        header: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setFileList([]);
        // 세션 스토리지 정보도 바꿔주기
        loginUser.phoneNumber = profile.phoneNumber;
        loginUser.email = profile.email;
        loginUser.isEmployed = profile.isEmployed;
        if (fileList.length !== 0) {
          loginUser.img = res.data;
        }
        sessionStorage.setItem("loginUser", JSON.stringify(loginUser));
        Swal.fire({
          icon: "success",
          iconColor: "#80b463",
          title: "프로필 수정이 완료되었습니다.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        message.error("프로필 수정에 실패하였습니다.");
      })
      .finally(() => {
        navigate(`/Mypage`);
      });
  };

  const emailSend = (profile) => {
    console.log(loginUser);
    console.log(profile.email);
    if (profile.email === "") {
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
        "http://localhost:8080/api-email/emailSend",
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

  return (
    <>
      프로필 수정하기
      <Switch
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e)}
      ></Switch>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        disabled={!componentDisabled}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          id: loginUser.id,
          password: "",
          name: loginUser.name,
          age: loginUser.age,
          gender: loginUser.gender,
          phoneNumber: loginUser.phoneNumber,
          email: loginUser.email,
          teacher: loginUser.teacher,
          birth: myBirth(),
          isEmployed: loginUser.isEmployed,
          studentId: loginUser.studentId,
          campus: loginUser.campus,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="img"
          label="프로필 사진"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Image
            src={loginUser.img ? loginUser.img : "/img/bonobono.png"}
            width={200}
          />
          <br />
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} style={{ marginTop: "6px" }}>
              프로필 사진 교체
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item name="id" label="아이디">
          <Input disabled={true} />
        </Form.Item>
        <div>비밀번호 변경을 원할 때만 입력해 주세요!</div>
        <Form.Item
          name="password"
          label="비밀번호"
          hasFeedback
          rules={[
            {
              message: "비밀번호를 입력하세요!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                // 유효성 만족
                if (
                  getFieldValue("password") === "" ||
                  isPW.test(getFieldValue("password"))
                ) {
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
          <Input.Password placeholder="8~16자 영문 대/소문자, 숫자, 특수문자 최소 1개씩 포함" />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
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

        <Form.Item name="name" label="이름">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item name="gender" label="성별">
          <Radio.Group disabled={true}>
            <Radio value="M"> 남 </Radio>
            <Radio value="F"> 여 </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="birth" label="생일">
          <DatePicker disabled={true} />
        </Form.Item>

        <Form.Item name="age" label="나이">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item name="phoneNumber" label="휴대폰 번호">
          <Input />
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
          ]}
        >
          <Space>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button htmlType="button" type="primary" ghost onClick={emailSend}>
              인증
            </Button>
          </Space>
        </Form.Item>

        <Form.Item name="studentId" label="학번">
          <Input disabled={true} />
        </Form.Item>

        <Form.Item name="teacher" label="담당 교수님">
          <Select disabled={true}>
            <Select.Option value="양명균">양명균</Select.Option>
            <Select.Option value="이승재">이승재</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="isEmployed" label="취업 여부">
          <Radio.Group>
            <Radio value={0}> 무직 </Radio>
            <Radio value={1}> 재직중 </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 8,
            offset: 8,
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              수정
            </Button>
            <Button onClick={signout}>회원탈퇴</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default MyPageForm;
