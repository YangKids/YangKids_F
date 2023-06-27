import { Card } from 'antd';
import './MainComponents.css';
import React, { useEffect, useState} from "react";
import { Link} from "react-router-dom";
const { Meta } = Card;

const CardNews = ({article}) => {

  const [item, setItem] = useState(null);
  useEffect(()=>{
    setItem(article)
  },[article])
return (
  <Link to={item? `/Board/${item.articleId}`:"/Main"}>
  <Card className='Card'
    hoverable
    style={{
      width: '270px',
      height: '380px',
      margin : '0 0 40px 0',
      borderRadius : '20px',
    }}
    cover={<img alt="IMG" src={item? (item.img? item.img : './img/bonobono.png') : './img/bonobono.png'}  style={{borderRadius : '20px 20px 0 0', height:'200px'}}/>}
  >
    <Meta title={item? item.title : "로딩중 ..."} description={item? item.content : "로딩중 ..."} />
  </Card>
  </Link>
);
};

export default CardNews;