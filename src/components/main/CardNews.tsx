import { Card } from "antd";
import "./MainComponents.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Article } from "../../types";
import useDeviceTypeStore from "../../stores/deviceTypeStore";
import { articleDummy } from "../../dummies";
const { Meta } = Card;

interface Props {
  article: Article;
}

const CardNews = (props: Props) => {
  const { deviceType } = useDeviceTypeStore();
  const [article, setArticle] = useState<Article>(articleDummy);
  useEffect(() => {
    setArticle(props.article);
  }, [props.article]);

  return (
    <>
      {deviceType === "web" ? (
        <Link
          to={article ? `/Board/${article.articleId}` : "/Main"}
          className="CardLink"
        >
          <Card
            className="Card"
            hoverable
            style={{
              width: "270px",
              height: "380px",
              margin: "0 0 40px 0",
              borderRadius: "20px",
              overflow: "hidden",
            }}
            cover={
              <img
                alt="IMG"
                src={
                  article
                    ? article.img
                      ? article.img
                      : "https://yangkidsbucket.s3.ap-northeast-2.amazonaws.com/noimg.png"
                    : "https://yangkidsbucket.s3.ap-northeast-2.amazonaws.com/noimg.png"
                }
                style={{ borderRadius: "20px 20px 0 0", height: "200px" }}
              />
            }
          >
            <Meta
              title={article ? article.title : "로딩중 ..."}
              description={article ? article.content : "로딩중 ..."}
            />
          </Card>
        </Link>
      ) : (
        <Link
          to={article ? `/Board/${article.articleId}` : "/Main"}
          className="CardLink"
        >
          <Card
            className="MobileArticlePreviewCard"
            hoverable
            cover={
              <img
                alt="IMG"
                src={
                  article
                    ? article.img
                      ? article.img
                      : "https://yangkidsbucket.s3.ap-northeast-2.amazonaws.com/noimg.png"
                    : "https://yangkidsbucket.s3.ap-northeast-2.amazonaws.com/noimg.png"
                }
                style={{ borderRadius: "20px 20px 0 0", height: "200px" }}
              />
            }
          >
            <Meta
              title={article ? article.title : "로딩중 ..."}
              description={article ? article.content : "로딩중 ..."}
            />
          </Card>
        </Link>
      )}
    </>
  );
};

export default CardNews;
