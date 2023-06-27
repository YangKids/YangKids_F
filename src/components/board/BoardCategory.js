import {
  BulbOutlined,
  LikeOutlined,
  ProfileOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
const items = [
  {
    label: (
      <Link to="FreeBoard" style={{ fontWeight: "bolder" }}>
        자유게시판
      </Link>
    ),
    key: 1,
    icon: <ProfileOutlined style={{ fontSize: "20px" }} />,
  },
  {
    label: (
      <Link to="QuestionBoard" style={{ fontWeight: "bolder" }}>
        질문게시판
      </Link>
    ),
    key: 2,
    icon: <QuestionOutlined style={{ fontSize: "20px" }} />,
    // disabled: true,
  },
  {
    label: (
      <Link to="InfoBoard" style={{ fontWeight: "bolder" }}>
        정보공유게시판
      </Link>
    ),
    key: 3,
    icon: <BulbOutlined style={{ fontSize: "20px" }} />,
  },

  {
    label: (
      <Link
        to="YangchelinBoard"
        style={{ fontWeight: "bolder", width: "400px" }}
      >
        양슐랭가이드
      </Link>
    ),
    key: 4,
    icon: <LikeOutlined style={{ fontSize: "20px" }} />,
  },
];

const BoardCategory = () => {
  const [current, setCurrent] = useState(1);
  const onClick = (e) => {
    // console.log('click ', e);
    setCurrent(e.key);
  };
  
  return (
    <Menu
      className="BoardCategory"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default BoardCategory;
