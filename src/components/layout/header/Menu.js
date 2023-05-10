
import { Dropdown} from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        자유게시판
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        질문게시판
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        맛집추천
      </a>
    ),
  },
];
const Menu = () => (
  
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomRight"
        overlayStyle={{width : '200px'}}
      >
        <MenuOutlined style={{fontSize : '25px'}} />
      </Dropdown>
      
     

);
export default Menu;