import { Popover } from "antd";
import { Link } from "react-router-dom";

const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
const name =  <span>{loginUser === null?"로그인 정보가 없습니다.": loginUser.name}</span>;

const content = (
  <div className="ProfileDetail">
    <img className="ProfileImg" src={loginUser === null?"/img/bonobono.png": loginUser.img === null? "/img/bonobono.png" : loginUser.img} alt="profileImg"></img>
    <p>닉네임?</p>
    <Link to="/MyPage">마이페이지</Link>
    <p>미니프로필에 뭐 넣으면 좋을까</p>
  </div>
);
const MiniProfile = () => {

  return (
    <Popover
      placement="bottomLeft"
      title={name}
      content={content}
    >
      <img className="ProfileImg" src={loginUser === null?"/img/bonobono.png": loginUser.img ===null? "/img/bonobono.png" : loginUser.img} alt="profileImg"></img>
    </Popover>
  );
};
export default MiniProfile;
