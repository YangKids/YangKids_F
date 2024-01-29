
import { Dropdown} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '0',
    label: (
      <Link to='/Board/NoticeBoard'>
        공지사항
      </Link>
    ),
  },
  {
    key: '1',
    label: (
      <Link to='/Board/FreeBoard'>
        자유게시판
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to='/Board/QuestionBoard'>
        질문게시판
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link to='/Board/InfoBoard'>
        정보공유게시판
      </Link>
    ),
  },

  {
    key: '4',
    label: (
      <Link to='/Board/YangchelinBoard'>
        양슐랭가이드
      </Link>
    ),
  },
];
const Menu = () => (
  
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
        overlayStyle={{width : '200px'}}
      >
        <MenuOutlined style={{fontSize : '25px'}} />
      </Dropdown>
      
     

);
export default Menu;