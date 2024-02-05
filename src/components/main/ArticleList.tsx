import { Avatar, List } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Article } from "../../types";
import { articleListDummy } from "../../dummies";

interface Props {
  boardId: Number;
}

const ArticleList = (props: Props) => {
  const [articleList, setArticleList] = useState<Article[]>([]);
  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api-article/board/${props.boardId}`
        );
        setArticleList(res.data);
      } catch (e) {
        console.log("아티클리스트 못가져옴");
        setArticleList(articleListDummy);
      }
    };

    getArticles();
    // console.log(articles);
  }, [props.boardId]);

  return (
    <List
      itemLayout="horizontal"
      dataSource={articleList.slice(0, 6)}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            style={{
              overflow: "hidden",
            }}
            avatar={<Avatar src={`../img/admin.png`} />}
            title={<Link to={`/Board/${item.articleId}`}>{item.title}</Link>}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );
};
export default ArticleList;
