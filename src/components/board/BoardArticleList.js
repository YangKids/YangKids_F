import React, { useEffect, useState } from "react";
import "./BoardPage.css";
import {
  EditOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
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
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      // try {
      const res = await axios.get(
        `http://localhost:8080/api-article/board/${boardId}`
      );
      setArticles(res.data);
      // } catch (e) {}
    };

    const getNotices = async () => {
      // try {
      const res = await axios.get(`http://localhost:8080/api-article/board/0`);
      if (res.data.length > 3) {
        setNotices(res.data.slice(0,3));
      } else {
        setNotices(res.data);
      }
      // } catch (e) {}
    };

    getArticles();
    getNotices();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Button
        icon={<EditOutlined />}
        style={{ alignSelf: "end", marginBottom: "10px", marginRight: "10px" }}
        onClick={() =>
          navigate("/Board/Write", { state: { boardId: boardId } })
        }
      >
        글쓰기
      </Button>
      <List
        className="articleList"
        header={
          <List
            className="noticeList"
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
            dataSource={notices}
            renderItem={(article, index) => (
              <List.Item
                actions={[
                  <div>{regDate(article.regDate)}</div>,
                  <IconText
                    icon={EyeOutlined}
                    text={article.viewCnt}
                    key="view"
                  />,
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
                style={
                  article.boardId === 0
                    ? {
                        backgroundColor: "#f1f3f5",
                        borderBottom: "1px solid #868e96",
                        paddingLeft: "5px",
                      }
                    : { paddingLeft: "5px" }
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        article.writerImg
                          ? article.writerImg
                          : `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
                      }
                      // src={article.writerImg}
                    />
                  }
                  title={
                    <Link to={`/Board/${article.articleId}`}>
                      {article.title}
                    </Link>
                  }
                  description={
                    article.boardId === 0
                      ? "관리자"
                      : article.isAnonymous === 0
                      ? article.writerName
                      : "익명"
                  }
                />
              </List.Item>
            )}
          ></List>
        }
        style={{
          width: "100%",
          borderTop: "2px solid #868e96",
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
            style={
              article.boardId === 0
                ? {
                    backgroundColor: "#f1f3f5",
                    borderBottom: "1px solid #868e96",
                    paddingLeft: "5px",
                  }
                : { paddingLeft: "5px" }
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    article.writerImg
                      ? article.writerImg
                      : `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
                  }
                  // src={article.writerImg}
                />
              }
              title={
                <Link to={`/Board/${article.articleId}`}>{article.title}</Link>
              }
              description={
                article.boardId === 0
                  ? "관리자"
                  : article.isAnonymous === 0
                  ? article.writerName
                  : "익명"
              }
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
