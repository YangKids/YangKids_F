import React from "react";
import "./MainComponents.css";
import CardNews from "./CardNews";
import SmallCard from "./SmallCard";
import { useEffect, useState } from "react";
import axios from "axios";
import useDeviceTypeStore from "../../stores/deviceTypeStore";
import { Article } from "../../types";
import { articleDummy, articleListDummy } from "../../dummies";

interface Props {
  boardId : Number
}

const HotArticle = (props : Props) => {
  const { deviceType } = useDeviceTypeStore();
  const [articleList, setArticleList] = useState<Article[]>([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
      const res = await axios.get(
        `http://localhost:8080/api-article/board/${props.boardId}`
      );
      setArticleList(res.data);

      } catch (e) {
        console.log("아티클 상세 못가져옴!")
        setArticleList(articleListDummy);
      }
    };
    getArticles();
    // console.log(articleList);
  }, [props.boardId]);

  return (
    <>
      {deviceType === "web" ? (
        <div className="ListBox">
          {/* <div className='List'>
            여긴 카드뉴스 느낌으로 인기게시글 여러개 띄울거임.

            </div> */}

          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingRight: "20px",
              }}
            >
              <CardNews article={articleList[0]} />
              <CardNews article={articleList[1]} />
              <CardNews article={articleList[2]} />
              <SmallCard article={articleList[3]} />
            </div>
            {window.innerWidth > 1200 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "20px",
                }}
              >
                <SmallCard article={articleList[4]} />
                <CardNews article={articleList[5]} />
                <CardNews article={articleList[6]} />
                <CardNews article={articleList[7]} />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="HotArticleBox">
          <div className="MobileTitle">인기 게시글</div>
          <CardNews article={articleList[0]} />
          <CardNews article={articleList[1]} />
          <CardNews article={articleList[2]} />
        </div>
      )}
    </>
  );
};

export default HotArticle;
