import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const USER_REST_API = "http://localhost:8080/api-user";

const LoginForm = () => {
  const navigate = useNavigate();
  const sessionStorage = window.sessionStorage;
  const onFinish = (values) => {
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
          console.log("메인페이지 라우팅좀 해보고싶다.")
          navigate('/Main');
        } else {
          // 로그인 실패
          alert(
            "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
          );
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
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
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="id"
        name="id"
        rules={[
          {
            required: true,
            message: "아이디를 입력해주세요",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="password"
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
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;