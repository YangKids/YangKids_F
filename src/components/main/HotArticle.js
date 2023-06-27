import React from "react";
import "./MainComponents.css";
import CardNews from "./CardNews";
import SmallCard from "./SmallCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThunderboltFilled } from "@ant-design/icons";

const HotArticle = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const res = await axios.get(`http://localhost:8080/api-article/board/1`);
      setArticles(res.data);
    };
    getArticles();
  }, []);

  return (
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
          <CardNews article={articles[0]} />
          <CardNews article={articles[1]} />
          <CardNews article={articles[2]} />
          <SmallCard article={articles[3]} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "20px",
          }}
        >
          <SmallCard article={articles[4]} />
          <CardNews article={articles[5]} />
          <CardNews article={articles[6]} />
          <CardNews article={articles[7]} />
        </div>
      </div>
    </div>
  );
};

export default HotArticle;
