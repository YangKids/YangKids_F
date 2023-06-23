import React, { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../layout/SearchBar";



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
  }, [boardId]);

  const navigate = useNavigate();

  return (
    <>
    <Button icon={<EditOutlined />} style={{alignSelf : "end", marginBottom:"10px", marginRight : "10px"}} onClick={()=> navigate("/Board/Write", 
    {state: { boardId : boardId}}
      )}>글쓰기</Button>
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
            <div style={{ display: "flex", width: "220px" }}>
              <div
                style={{
                  display: "flex",
                  width: "80px",
                  justifyContent: "center",
                }}
              >
                작성일
              </div>
              <div
                style={{
                  display: "flex",
                  width: "55px",
                  justifyContent: "center",
                }}
              >
                조회수
              </div>
              <div
                style={{
                  display: "flex",
                  width: "55px",
                  justifyContent: "center",
                }}
              >
                좋아요
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50px",
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
              <IconText icon={EyeOutlined} text={article.viewCnt} key="view" />,
              <IconText
                icon={LikeOutlined}
                text={article.likeCnt}
                key="like"
              />,
              <IconText
                icon={MessageOutlined}
                text={article.commentCnt}
                key="comment"
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={article.writerImg? article.writerImg : `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  // src={article.writerImg}
                />
              }
              title={
                <Link to={`/Board/${article.articleId}`}>{article.title}</Link>
              }
              description={article.isAnonymous === 0? article.writerName: "익명"}
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
