import React from "react";
import "./MainComponents.css";
import { useState, useEffect } from "react";
import ArticleList from "./ArticleList";
import { Link } from "react-router-dom";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

const FreeBoardPreview = () => {
  const { deviceType } = useDeviceTypeStore();
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

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

          <div
            className="MobileCard"
          >
            <div className="MobileCardContents">
              <div className="MobileTitle">
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
      )}
    </>
  );
};

export default FreeBoardPreview;
