import { Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./SearchBar.css";

const { Option } = Select;

const SearchBar = () => {
  const [word, setWord] = useState("");
  const [key, setKey] = useState("title");

  const onChangeKey = (e) => {
    setKey(e);
  };

  const onChangeWord = (event) => {
    setWord(event.target.value);
    // console.log(event.target.value);
  };


  const selectBefore = (
    <Select
      defaultValue="title"
      onChange={onChangeKey}
      style={{ height: "100%", width : "80px" }}
    >
      <Option value="title">제목</Option>
      <Option value="name">작성자</Option>
      <Option value="content">내용</Option>
    </Select>
  );
  const onClick = () => {
    console.log(key + word )
    navigate("/Board/SearchResult", {
      state: { key: key, word: word },
    });
  };

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <Input
        addonBefore={selectBefore}
        value={word}
        placeholder="검색어를 입력하세요."
        onChange={onChangeWord}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            console.log(key + word )
            navigate("/Board/SearchResult", {
              state: { key: key, word: word },
            });
          }
        }}
      />
      <Button
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "0 6px 6px 0",
        }}
        onClick={onClick}
      >
        <SearchOutlined />
      </Button>
    </div>
  );
};

export default SearchBar;
