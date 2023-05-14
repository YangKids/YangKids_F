import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import React from 'react';
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `게시글도 DB에서 받아와서 띄워줄테니까 ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'API로 하는건가? 어떻게하는거지 감이 안잡히네',
  content:
    '오늘 저녁은 뭐먹지... 뷰 시험 공부도 해야하는데 ㅎㅎ 큰일났다.살려줘... 아니야 그냥 죽여줘.. ',
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const BoardArticleList = () => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="/img/carousel.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);
export default BoardArticleList;