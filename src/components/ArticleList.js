import { Avatar, List } from 'antd';
const data = [
  {
    title: '롤 할 사람 10명 구함',
  },
  {
    title: '왜 벌써 12시야 으악',
  },
  {
    title: '가오갤 3 보러가고 싶다.',
  },
  {
    title: '아 옆집 파티하나 시끄러워 ㅡㅡ',
  },
  {
    title: '눈건조해 안경사야겠다. 렌즈계속끼려니 힘드네',
  },
];
const ArticleList = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="내용 상세 넣는 곳인데 넣을지 말지 고민중. 조금은 들어가도 괜찮을거 같기도? 5개면 적당하겠다 크기는."
        />
      </List.Item>
    )}
  />
);
export default ArticleList;