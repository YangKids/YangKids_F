import { Popover, Button, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useDeviceTypeStore from "../../../stores/deviceTypeStore";

const MiniProfile = () => {
  const { deviceType } = useDeviceTypeStore();
  const navigate = useNavigate();
  var loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  // 로그인 하고나서 새로고침 안해도 loginUser 정보 새로 가져오도록!
  // useEffect(() => {
  //   loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  // }, [sessionStorage]);

  const name = (
    <span>
      {loginUser == null ? "로그인 정보가 없습니다." : loginUser.name}
    </span>
  );

  const logout = () => {
    sessionStorage.clear(); // 세션스토리지에 저장된 로그인 정보 날리기
    Swal.fire({
      icon: "success",
      iconColor: "#80b463",
      title: "로그아웃 되었습니다.",
      showConfirmButton: false,
      timer: 1500,
    });
    // 메인페이지로 이동
    navigate("/Enterance");
  };
  const myArticle = () => {
    const userName = loginUser.name;
    console.log(userName);
    navigate("/Board/SearchResult", {
      state: { key: `name`, word: loginUser.name },
    });
  };

  const content = (
    <div className="ProfileDetail">
      <Avatar
        className="ProfileImg"
        src={loginUser ? loginUser.img : "./surprised_cat.png"}
      />
      <br />
      <Button
        type="link"
        onClick={myArticle}
        style={{
          paddingLeft: 0,
        }}
      >
        내 글 보기
      </Button>
      <br />
      <Link to="/MyPage">마이페이지</Link>
      <br />
      <Button
        type="link"
        onClick={logout}
        style={{
          paddingLeft: 0,
        }}
      >
        로그아웃
      </Button>
    </div>
  );

  return (
    <Popover placement="bottomLeft" title={name} content={content}>
      <Avatar
        className={deviceType === "web" ? "ProfileImg" : "MobileProfileImg"}
        src={loginUser ? loginUser.img : "./surprised_cat.png"}
      />
    </Popover>
  );
};
export default MiniProfile;
