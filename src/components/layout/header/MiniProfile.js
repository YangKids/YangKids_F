import { Popover, Button } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

const MiniProfile = () => {
  const navigate = useNavigate();
  var loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  // 로그인 하고나서 새로고침 안해도 loginUser 정보 새로 가져오도록!
  useEffect(() => {
    loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
  }, sessionStorage);

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

  const content = (
    <div className="ProfileDetail">
      <img
        className="ProfileImg"
        src={
          loginUser == null
            ? "/img/bonobono.png"
            : loginUser.img === null
            ? "/img/bonobono.png"
            : loginUser.img
        }
        alt="profileImg"
      ></img>
      <p>내 글 보기</p>
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
      <img
        className="ProfileImg"
        src={
          loginUser == null
            ? "/img/bonobono.png"
            : loginUser.img === null
            ? "/img/bonobono.png"
            : loginUser.img
        }
        alt="profileImg"
      ></img>
    </Popover>
  );
};
export default MiniProfile;
