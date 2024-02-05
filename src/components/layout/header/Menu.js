
import { Dropdown} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '0',
    label: (
      <Link to='/board/notice'>
        공지사항
      </Link>
    ),
  },
  {
    key: '1',
    label: (
      <Link to='/board/free'>
        자유게시판
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to='/board/question'>
        질문게시판
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link to='/board/info'>
        정보공유게시판
      </Link>
    ),
  },

  {
    key: '4',
    label: (
      <Link to='/board/yangchelin'>
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