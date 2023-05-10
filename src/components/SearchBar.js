import { Button, Input } from 'antd';
import{SearchOutlined} from '@ant-design/icons';
// const { Search } = Input;

// const onSearch = (value) => console.log(value);
const SearchBar = () => (
    <div style={{display:'flex', flexDirection:'row', width : "100%"}}>
    <Input placeholder="검색어를 입력하세요."  style={{ width : '100%',borderRadius : '20px 0 0 20px'} } />
    <Button style={{ width:'40px',height:'40px',borderRadius : '0 20px 20px 0'}}><SearchOutlined /></Button>
    </div>
);
export default SearchBar;