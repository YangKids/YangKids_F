import { Card } from 'antd';
const { Meta } = Card;
const SmallCard = () => (
    <Card
        hoverable
        style={{
            width: '100%',
            height: '160px',
            margin: '0 0 40px 0',
            borderRadius: '20px',
        }}
    // cover={<img alt="example" src='./img/bonobono.png' />}
    >
        <Meta title="오늘의 점심" description='초코우유, 식혜, 분홍소세지, 돈까스, 라멘' />
    </Card>
);

export default SmallCard;