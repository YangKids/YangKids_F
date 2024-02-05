import {
  BulbOutlined,
  LikeOutlined,
  NotificationOutlined,
  ProfileOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const items = [
  {
    label: (
      <Link to="/board/notice" className="MenuText">
        공지
      </Link>
    ),
    key: 0,
    icon: <NotificationOutlined style={{ fontSize: "20px" }} />,
  },
  {
    label: (
      <Link to="/board/free" className="MenuText">
        자유
      </Link>
    ),
    key: 1,
    icon: <ProfileOutlined style={{ fontSize: "20px" }} />,
  },
  {
    label: (
      <Link to="/board/question" className="MenuText">
        질문
      </Link>
    ),
    key: 2,
    icon: <QuestionOutlined style={{ fontSize: "20px" }} />,
    // disabled: true,
  },
  {
    label: (
      <Link to="/board/info" className="MenuText">
        정보
        
      </Link>
    ),
    key: 3,
    icon: <BulbOutlined style={{ fontSize: "20px" }} />,
  },

  {
    label: (
      <Link to="/board/yangchelin" className="MenuText">
        양슐랭
      </Link>
    ),
    key: 4,
    icon: <LikeOutlined style={{ fontSize: "20px" }} />,
  },
];

const Navbar = () => {
  const [currentKey, setCurrentKey] = useState<number|undefined>(undefined);
  //@ts-ignore
  const onClick = (e) => {
    // console.log('click ', e);
    setCurrentKey(e.key);
  };

  return (
    <Menu
      className="Navbar"
      onClick={onClick}
      selectedKeys={currentKey? [currentKey.toString()] : undefined }
      mode="horizontal"
      items={items}
    />
  );
};

export default Navbar;
