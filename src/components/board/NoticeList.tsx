import React, { useEffect, useState } from "react";
import "./BoardPage.css";
import {
CaretDownFilled,
  EditOutlined,
  EyeOutlined,
  LikeOutlined,
  LoadingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Avatar, Button, List, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../layout/SearchBar";
import useDeviceTypeStore from "../../stores/deviceTypeStore";
import { Article, User } from "../../types";
import { NoticeListDummy } from "../../dummies";

interface Props {
  boardId: Number;
}

function regDate(date: string) {
  return (
    new Date(date).getFullYear() +
    ". " +
    new Date(date).getMonth() +
    ". " +
    new Date(date).getDate()
  );
}

const NoticeList = (props: Props) => {
  const [noticeList, setNoticeList] = useState<Article[]>([]);
  const [loginUser, setLoginUser] = useState<User>({isAdmin : 0});
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { deviceType } = useDeviceTypeStore();
  const navigate = useNavigate();


  const IconText = ({
    icon,
    text,
  }: {
    icon: React.ReactElement;
    text: string;
  }) => (
    <Space size={deviceType !== "web" ? 2 : "middle"}>
      {icon}
      {text}
    </Space>
  );

  useEffect(() => {
    if(sessionStorage.getItem("loginUser") !== null){
      setLoginUser(JSON.parse(sessionStorage.getItem("loginUser")!));
    }
  }, []);

  useEffect(() => {
    const getNotices = async () => {
      try {
      const res = await axios.get(`http://localhost:8080/api-article/board/0`);
      setNoticeList(res.data);
      setInitLoading(false);

      } catch (e) {
        setNoticeList(NoticeListDummy)
        setInitLoading(false)
      }
    };
    getNotices();
  }, []);

  const onLoadMore = async () => {
    setLoading(true);

    //코드 페이지네이션 찾으면 교체해야함 이거 그냥 보드 전체 게시글 받아오는 코드인듯
    try {
      const res = await axios.get(`http://localhost:8080/api-article/board/0`);
      setNoticeList(res.data);
      setLoading(false);

      } catch (e) {
        setNoticeList(NoticeListDummy)
        setLoading(false)
      }
    window.dispatchEvent(new Event("resize"));
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore} style={{padding : "4px 6px"}}>
          <CaretDownFilled style={{fontSize : "20px"}}/>
        </Button>
      </div>
    ) : (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <LoadingOutlined style={{fontSize : "20px"}}/>
      </div>
    );

  return (
    <>
    {deviceType === "web"?
    <>
      {loginUser.isAdmin === 1 ? (
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
      ) : null}
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
          borderTop: "2px solid #868e96",
        }}
        pagination={{
          position: "bottom",
          align: "center",
        }}
        dataSource={noticeList}
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
            style={{
              paddingLeft: "5px",
            }}
          >
            <List.Item.Meta
              avatar={<Avatar src={`../img/admin.png`} />}
              title={
                <Link to={`/Board/${article.articleId}`}>{article.title}</Link>
              }
              description="관리자"
            />
          </List.Item>
        )}
      />
      <div className="Search">
        <SearchBar />
      </div>
    </>
    :
    <>
      {loginUser.isAdmin === 1 ? (
        <Button
          icon={<EditOutlined />}
          style={{
            alignSelf: "end",
            marginBottom: "10px",
          }}
          onClick={() =>
            navigate("/board/write", { state: { boardId: props.boardId } })
          }
        >
        </Button>
      ) : null}
      <List
        style={{
          width: "100%",
          borderTop: "2px solid #868e96",
        }}
        loadMore={loadMore}
        dataSource={noticeList}
        renderItem={(article, index) => (
          <List.Item
            actions={[
              <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ textAlign: "end" }}>
                {regDate(article.regDate)}
              </div>
              <div style={{ display: "flex", gap: "4px" }}>
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
            </div>,
            ]}
            style={{
              paddingLeft: "5px",
            }}
          >
            <List.Item.Meta
              avatar={<Avatar src={`../img/admin.png`} />}
              title={
                <Link to={`/Board/${article.articleId}`}>{article.title}</Link>
              }
              description="관리자"
            />
          </List.Item>
        )}
      />
      <div className="MobileSearch">
        <SearchBar />
      </div>
    </>
    }
      
    </>
  );
};
export default NoticeList;
