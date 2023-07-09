import { Card } from "antd";
import "./MainComponents.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { Meta } = Card;

const SmallCard = ({article}) => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    setItem(article);
  }, [article]);
  return (
    <Link to={item ? `/Board/${item.articleId}` : "/Main"} className="CardLink">
      <Card
        hoverable
        style={{
          width: "100%",
          height: "160px",
          margin: "0 0 40px 0",
          borderRadius: "20px",
        }}
      >
        <Meta
          title={item ? item.title : "로딩중 ..."}
          description={item ? item.content : "로딩중 ..."}
        />
      </Card>
    </Link>
  );
};

export default SmallCard;
