import React from "react";
import "./MainComponents.css";
import { useState, useEffect } from "react";
import ArticleList from "./ArticleList";
import { Link } from "react-router-dom";
import useDeviceTypeStore from "../../stores/deviceTypeStore";
import { Button, Carousel } from "antd";
import axios from "axios";
import { Article } from "../../types";
import { NotificationOutlined } from "@ant-design/icons";
import { NoticeListDummy } from "../../dummies";

const NoticeCard = () => {
  const { deviceType } = useDeviceTypeStore();
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [noticeList, setNoticeList] = useState<Article[]>(NoticeListDummy);
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    const getNoticeList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api-article/board/0`
        );
        setNoticeList(res.data);
      } catch (e) {
        console.log("노티리스트 못가져옴!");
        setNoticeList(NoticeListDummy);
      }
    };
    if (deviceType !== "web") getNoticeList();
    // console.log(articles);
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", handleScroll);
    }; //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  return (
    <>
      {deviceType === "web" ? (
        <div className="WebListBox">
          <div
            className={
              ScrollY > 1220
                ? "FixedList"
                : ScrollY > 397
                ? "MovingList"
                : "List"
            }
          >
            <div className="FreeBoardContents">
              <div className="Title">
                <Link
                  to="/Board/NoticeBoard"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  공지사항
                </Link>
              </div>
              <div className="Articles">
                <ArticleList boardId={0} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="NoticeCarouselBox">
          <Button style={{ height: "100%" }}>
            <Link to="/board/notice">
              <NotificationOutlined style={{ fontSize: "20px" }} />
            </Link>
          </Button>
          <div style={{ display: "block", width: "calc(100% - 60px)" }}>
            <Carousel autoplay autoplaySpeed={4000} dots={false}>
              {noticeList.map((notice) => (
                <div className="NoticeCarouselContent">
                  <Link to={`/board/${notice.articleId}`} style={{color:"black"}}>{notice.title}</Link>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeCard;
