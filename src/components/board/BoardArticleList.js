import React, { useEffect, useState } from "react";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBar from "../main/SearchBar";

// 이런식으로 하면 밑에 const data 필요 없을듯??

// const getArticles = async ()=> {
//   const json = await(
//     await fetch(`http://localhost:9999/board-api/board/${boardId}`)
//   ).json();
// }

// const articles = Array.from({
//   length: 23,
// }).map((_, i) => ({
//   href: `http://localhost:3000/Board/${i}`,
//   title: `게시글도 DB에서 받아와서 띄워줄테니까 ${i}`,
//   avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
//   description: "액시오스 가져와아아아아악",
//   regDate: "2023-06-12",
//   writer: "정재웅",
//   content:
//     "오늘 저녁은 뭐먹지... 뷰 시험 공부도 해야하는데 ㅎㅎ 큰일났다.살려줘... 아니야 그냥 죽여줘.. ",
// }));

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function regDate(date) {
  return (
    new Date(date).getFullYear() +
    ". " +
    new Date(date).getMonth() +
    ". " +
    new Date(date).getDate()
  );
}

const BoardArticleList = ({ boardId }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getArticles = async () => {
      // try {
      const res = await axios.get(
        `http://localhost:8080/api-article/board/${boardId}`
      );
      setArticles(res.data);
      // } catch (e) {}
    };
    getArticles();
    // console.log(articles);
  }, []);

  return (
    <>
      <List
        header={
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexGrow: "1",
                justifyContent: "center",
              }}
            >
              제목
            </div>
            <div style={{ display: "flex", width: "200px" }}>
              <div
                style={{
                  display: "flex",
                  width: "90px",
                  justifyContent: "center",
                }}
              >
                작성일
              </div>
              <div
                style={{
                  display: "flex",
                  width: "65px",
                  justifyContent: "center",
                }}
              >
                좋아요
              </div>
              <div
                style={{
                  display: "flex",
                  width: "45px",
                  justifyContent: "center",
                }}
              >
                댓글
              </div>
            </div>
          </div>
        }
        style={{
          width: "100%",
          borderTop: "2px solid rgba(0, 0, 0, 0.1)",
        }}
        pagination={{
          position: "bottom",
          align: "center",
        }}
        dataSource={articles}
        renderItem={(article, index) => (
          <List.Item
            actions={[
              <div>{regDate(article.regDate)}</div>,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  // src={article.writerImg}
                />
              }
              title={<Link to={article.href}>{article.title}</Link>}
              description={article.name}
            />
          </List.Item>
        )}
      />
      <div className="Search">
        <SearchBar />
      </div>
    </>
  );
};
export default BoardArticleList;
