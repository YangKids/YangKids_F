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
import { Article } from "../../types";
import { NoticeListDummy, articleListDummy } from "../../dummies";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

interface Props {
  boardId: Number;
}

const IconText = ({
  icon,
  text,
}: {
  icon: React.ReactElement;
  text: string;
}) => (
  <Space>
    {icon}
    {text}
  </Space>
);

function regDate(date: string) {
  return (
    new Date(date).getFullYear() +
    ". " +
    (new Date(date).getMonth() + 1) +
    ". " +
    new Date(date).getDate()
  );
}

const BoardArticleList = (props: Props) => {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [noticeList, setNoticeList] = useState<Article[]>([]);
  const { deviceType } = useDeviceTypeStore();

  useEffect(() => {
    const getarticleList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api-article/board/${props.boardId}`
        );
        setArticleList(res.data);
      } catch (e) {
        setArticleList(articleListDummy);
      }
    };

    const getNoticeList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api-article/board/0`
        );
        if (res.data.length > 3) {
          setNoticeList(res.data.slice(0, 3));
        } else {
          setNoticeList(res.data);
        }
      } catch (e) {
        setNoticeList(NoticeListDummy);
      }
    };

    getarticleList();
    getNoticeList();
  }, [props.boardId]);

  const navigate = useNavigate();
  return (
    <>
      {deviceType === "web" ? (
        <>
          <Button
            icon={<EditOutlined />}
            style={{
              alignSelf: "end",
              marginBottom: "10px",
              marginRight: "10px",
            }}
            onClick={() =>
              navigate("/Board/Write", { state: { boardId: props.boardId } })
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
                dataSource={noticeList}
                renderItem={(article: Article, index) => (
                  <List.Item
                    actions={[
                      <div>{regDate(article.regDate)}</div>,
                      <IconText
                        icon={<EyeOutlined />}
                        text={article.viewCnt.toString()}
                        key="view"
                      />,
                      <IconText
                        icon={<LikeOutlined />}
                        text={article.likeCnt.toString()}
                        key="like"
                      />,
                      <IconText
                        icon={<MessageOutlined />}
                        text={article.commentCnt.toString()}
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
                      avatar={<Avatar src={`../img/admin.png`} />}
                      title={
                        <Link to={`/Board/${article.articleId}`}>
                          {article.title}
                        </Link>
                      }
                      description={"관리자"}
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
            dataSource={articleList}
            renderItem={(article, index) => (
              <List.Item
                actions={[
                  <div>{regDate(article.regDate)}</div>,
                  <IconText
                    icon={<EyeOutlined />}
                    text={article.viewCnt.toString()}
                    key="view"
                  />,
                  <IconText
                    icon={<LikeOutlined />}
                    text={article.likeCnt.toString()}
                    key="like"
                  />,
                  <IconText
                    icon={<MessageOutlined />}
                    text={article.commentCnt.toString()}
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
                        article.isAnonymous === 1
                          ? `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
                          : article.writerImg
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
                    article.isAnonymous === 0 ? article.writerName : "익명"
                  }
                />
              </List.Item>
            )}
          />
        </>
      ) : (
        <>
          <Button
            icon={<EditOutlined />}
            style={{
              alignSelf: "end",
              marginBottom: "10px",
            }}
            onClick={() =>
              navigate("/Board/Write", { state: { boardId: props.boardId } })
            }
          ></Button>
          <List
            className="articleList"
            header={
              <List
                className="noticeList"
                dataSource={noticeList}
                renderItem={(article: Article, index) => (
                  <List.Item
                    actions={[
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{textAlign:"end"}}>{regDate(article.regDate)}</div>
                        <div style={{ display: "block" }}>
                          <IconText
                            icon={<EyeOutlined />}
                            text={article.viewCnt.toString()}
                            key="view"
                          />
                          <IconText
                            icon={<LikeOutlined />}
                            text={article.likeCnt.toString()}
                            key="like"
                          />
                          <IconText
                            icon={<MessageOutlined />}
                            text={article.commentCnt.toString()}
                            key="comment"
                          />
                        </div>
                      </div>
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
                      title={
                        <Link to={`/Board/${article.articleId}`}>
                          {article.title}
                        </Link>
                      }
                      description={"관리자"}
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
            dataSource={articleList}
            renderItem={(article, index) => (
              <List.Item
                actions={[
                  <div>{regDate(article.regDate)}</div>,
                  <IconText
                    icon={<EyeOutlined />}
                    text={article.viewCnt.toString()}
                    key="view"
                  />,
                  <IconText
                    icon={<LikeOutlined />}
                    text={article.likeCnt.toString()}
                    key="like"
                  />,
                  <IconText
                    icon={<MessageOutlined />}
                    text={article.commentCnt.toString()}
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
                  title={
                    <Link to={`/Board/${article.articleId}`}>
                      {article.title}
                    </Link>
                  }
                  description={
                    article.isAnonymous === 0 ? article.writerName : "익명"
                  }
                />
              </List.Item>
            )}
          />
        </>
      )}

      <div className={deviceType === "web" ? "Search" : "MobileSearch"}>
        <SearchBar />
      </div>
    </>
  );
};
export default BoardArticleList;
