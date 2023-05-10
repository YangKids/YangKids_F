import { Card } from 'antd';
import './components.css';
const { Meta } = Card;

const CardNews = () => (

  <Card className='Card'
    hoverable
    style={{
      width: '100%',
      height: '380px',
      margin : '0 0 40px 0',
      borderRadius : '20px',
    }}
    cover={<img alt="example" src='./img/bonobono.png'  style={{borderRadius : '20px 20px 0 0', height:'200px'}}/>}
  >
    <Meta title="코로나 감염자 현황 : 현재 4명" description="민식, 경호, 민혁, 지현" />
  </Card>
);
export default CardNews;