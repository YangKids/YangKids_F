import Card from "antd/es/card/Card";
import LoginForm from "../login/LoginForm";
import { HeartTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

const LoginCard = () => {
  const {deviceType} = useDeviceTypeStore()
  console.log("로그인카드에서 디바이스타입" , deviceType)

  return (
    <Card
      title="로그인"
      headStyle={
        deviceType === "web"
          ? { fontSize: "24px", minHeight: "60px" }
          : { fontSize: "16px", minHeight: "48px" }
      }
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "center",
        fontSize: deviceType === "web" ? "16px" : "14px",
        padding : deviceType === "smallMobile"? "12px": "24px",
      }}
      bordered={false}
      style={deviceType === "web" ? {
        display: "flex",
        flexDirection: "column",
        minWidth: "500px",
        width: window.innerWidth / 4,
        height: window.innerHeight / 3,
        textAlign: "center",
      }:{
        display: "flex",
        flexDirection: "column",
        minWidth: "300px",
        maxWidth: "600px",
        width: window.innerWidth * 0.8,
        height: window.innerHeight / 2.5,
        textAlign: "center",
      }
    }
    >
      <LoginForm></LoginForm>
      <div>
        <span style={{ margin: "15px" }}>
          <HeartTwoTone twoToneColor="#eb2f96" />
          <Link to="/Find" style={{ color: "black" }}>
            {" "}
            회원정보 찾기
          </Link>
        </span>
        <span style={{ margin: "15px" }}>
          <HeartTwoTone twoToneColor="#eb2f96" />
          <Link to="/Signup" style={{ color: "black" }}>
            {" "}
            회원가입
          </Link>
        </span>
      </div>
    </Card>
  );
};

export default LoginCard;
