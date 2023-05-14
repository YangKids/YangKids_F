import { Button} from "antd";
import { LoginOutlined } from "@ant-design/icons";
const LoginButton = () => {

  return (
            // <Link to = '/Login'>
          <Button
            shape="round"
            icon={<LoginOutlined />}
            size={"large"}
          >
            로그인
          </Button>
        //   </Link>



    );
};
export default LoginButton;
