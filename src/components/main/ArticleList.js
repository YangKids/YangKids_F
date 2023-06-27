import { Avatar, List } from 'antd';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ArticleList = ({ boardId }) => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const getArticles = async () => {
      // try {
      const res = await axios.get(`http://localhost:8080/api-article/board/${boardId}`);
      setArticles(res.data);
      
      // } catch (e) {}
    };

    getArticles();
    // console.log(articles);
  }, [boardId]);

  const navigate = useNavigate();

  return (
    <List
        itemLayout="horizontal"
        dataSource={articles.slice(0,6)}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
              title={<Link to={`/Board/${item.articleId}`}>{item.title}</Link>}
              description={item.content}
            />
          </List.Item>
        )}
      />
  );

};
export default ArticleList;