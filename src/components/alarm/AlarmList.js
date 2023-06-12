import { Avatar, List } from 'antd';
const data = [
  {
    title: '롤 할 사람 10명 구함',
    content: '알람 어떻게 띄워준다 그랬찌 뭐 보내주는거 있나?',
    articleId : 1,
    commentId : 1,
    recommentId : null,
    ischeckted : false
  },
  {
    title: '왜 벌써 12시야 으악',
    content: 'db에는 코멘트id랑 아티클id 리코멘트id 있네'
  },
  {
    title: '가오갤 3 보러가고 싶다.',
    content: '따로 내용 띄워주려면 한번더 불러와야겠다.'
  },
  {
    title: '아 옆집 파티하나 시끄러워 ㅡㅡ',
    content: '귀찮넹!'
  },
  {
    title: '눈건조해 안경사야겠다. 렌즈계속끼려니 힘드네',
    content: '선크림사러가야지'
  },
];
const AlarmList = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta

        //아바타는 글 쓴사람 프사?
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description={item.content}
        />
      </List.Item>
    )}
  />
);
export default AlarmList;