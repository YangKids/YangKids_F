import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

const USER_REST_API = "http://localhost:8080/api-user";

const LoginForm = () => {
  const {deviceType} = useDeviceTypeStore();
  const navigate = useNavigate();
  const sessionStorage = window.sessionStorage;

  const onFinish = (values: { id: string; password: string }) => {
    console.log("Success:", values);
    axios
      .post(
        `${USER_REST_API}/login`,
        new URLSearchParams({
          id: values.id,
          password: values.password,
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
          sessionStorage.setItem("access-token", response.data["access-token"]);
          // 메인페이지로 이동

          navigate("/");
        } else {
          // 로그인 실패
          alert(
            "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
          );
        }
      });
  };
  //아래 errorInfo 의 타입은 id 와 password 이지만 validateEntityType 이라는 antd의 interface 를 불러오지 못함..
  //해결되면 {} 를 교체해야함.
  const onFinishFailed = (errorInfo: {}) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
        fontSize: "20px",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {deviceType === "smallMobile" ? (
        <div>
          <Form.Item
            name="id"
            rules={[
              {
                required: true,
                message: "아이디를 입력해주세요",
              },
            ]}
          >
            <Input placeholder="아이디" style={{ borderRadius: "6px" }} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해주세요",
              },
            ]}
          >
            <Input.Password placeholder="비밀번호"/>
          </Form.Item>
          <Form.Item
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button type="primary" htmlType="submit">
              YangKids 로그인
            </Button>
          </Form.Item>
        </div>
      ) : (
        <div>
          <Form.Item
            label="아이디"
            name="id"
            rules={[
              {
                required: true,
                message: "아이디를 입력해주세요",
              },
            ]}
            style={
              window.innerWidth > window.innerHeight
                ? {}
                : { marginBottom: "0px" }
            }
            // style={{marginBottom :"0px"}}
          >
            <Input style={{ borderRadius: "6px" }} />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="password"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해주세요",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button type="primary" htmlType="submit">
              YangKids 로그인
            </Button>
          </Form.Item>
        </div>
      )}
    </Form>
  );
};

export default LoginForm;
