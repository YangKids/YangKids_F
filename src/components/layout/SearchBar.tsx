import { Button, Input, Select } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./SearchBar.css";
import useSearchButtonTypeStore from "../../stores/searchButtonTypeStore";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

const { Option } = Select;

const SearchBar = () => {
  const [word, setWord] = useState("");
  const [key, setKey] = useState<"title" | "content" | "name">("title");
  const {deviceType} = useDeviceTypeStore();
  const { searchButtonType, setSearchButtonType } = useSearchButtonTypeStore();

  const onChangeKey = (key: "title" | "content" | "name") => {
    setKey(key);
  };

  const onChangeWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const selectBefore = (
    <Select
      defaultValue="title"
      onChange={onChangeKey}
      style={
        searchButtonType === "bar"
          ? { height: "100%", width: "80px" }
          : { display: "none" }
      }
    >
      <Option value="title">제목</Option>
      <Option value="name">작성자</Option>
      <Option value="content">내용</Option>
    </Select>
  );
  const onClick = () => {
    console.log(key + word);
    if (searchButtonType === "bar") {
      navigate("/Board/SearchResult", {
        state: { key: key, word: word },
      });
    } else if (searchButtonType === "button") {
      setSearchButtonType("bar");
    }
  };

  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "end",
      }}
    >
      {deviceType !== "web"?<div
        style={
          searchButtonType === "bar"
            ? { display: "flex", justifyContent: "center", marginRight: "5px" }
            : { display: "none" }
        }
        onClick={() => {
          setSearchButtonType("button");
        }}
      >
        <CloseOutlined style={{ fontSize: "16px" }} />
      </div>: null }
      
      <Input
        style={
          searchButtonType === "bar"
            ? { transition: "0.3s ease-in-out" }
            : { width: "0%", transition: "0.3s ease-in-out" }
        }
        // addonBefore={searchButtonType === "bar"? selectBefore : null}
        addonBefore={selectBefore}
        variant={searchButtonType === "bar" ? "filled" : "borderless"}
        value={word}
        placeholder="검색어를 입력하세요."
        onChange={onChangeWord}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            console.log(key + word);
            navigate("/Board/SearchResult", {
              state: { key: key, word: word },
            });
          }
        }}
      />

      <Button
        style={
          searchButtonType === "bar"
            ? {
                width: "40px",
                height: "40px",
                borderRadius: "0 6px 6px 0",
                marginRight: "0px",
                paddingLeft: "14px",
              }
            : {
                width: "40px",
                height: "40px",
                borderRadius: "20px",
                marginRight: "0px",
                paddingLeft: "14px",
              }
        }
        onClick={onClick}
      >
        <SearchOutlined />
      </Button>
    </div>
  );
};

export default SearchBar;
