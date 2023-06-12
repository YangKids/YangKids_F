import { Popover } from "antd";
import { Link } from "react-router-dom";
const text = <span>차차아버님</span>;   
const content = (
  <div className="ProfileDetail">
    <img className="ProfileImg" src="img/bonobono.png" alt="profileImg"></img>
    <p>닉네임</p>
    <Link to="/MyPage">마이페이지</Link>
    <p>미니프로필에 뭐 넣으면 좋을까</p>
  </div>
);
const MiniProfile = () => {

  return (
    <Popover
      placement="bottomLeft"
      title={text}
      content={content}
    >
      <img className="ProfileImg" src="img/bonobono.png" alt="profileImg"></img>
    </Popover>
  );
};
export default MiniProfile;
