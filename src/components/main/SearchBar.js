import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const onChange = (event) => {
    setKeyword(event.target.value);
    // console.log(event.target.value);
  };

  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <Input
        value={keyword}
        placeholder="검색어를 입력하세요."
        onChange={onChange}
        style={{ width: "100%", borderRadius: "20px 0 0 20px" }}
      />
      <Button
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "0 20px 20px 0",
        }}
        onClick={()=>{navigate("/Board/SearchResult", {state:{keyowrd: keyword}})}}
      >
        <SearchOutlined />
      </Button>
    </div>
  );
};
export default SearchBar;
