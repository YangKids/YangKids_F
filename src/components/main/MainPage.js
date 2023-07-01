import React from "react";
import "./MainPage.css";
import FreeBoardPreview from "./FreeBoardPreview";
import FreeBoard from "./FreeBoard";
import HotArticle from "./HotArticle";
import SearchBar from "../layout/SearchBar";
import YangchelinGuide from "./YangchelinGuide";
import Header from "../layout/header/Header";
import Quot from "../layout/Carousel";

const MainPage = () => {
  return (
    <div>

      <Header />
      <Quot />


      <div className="Body">
        <div className="SearchBox">
          <SearchBar />
        </div>

        <div className="CardBox">
          <FreeBoardPreview />
          <div style={{ minWidth: "40px", height: "1410px" }}></div>
          <HotArticle boardId={1}/>
        </div>

        <div className="CardBox">
          <FreeBoard boardId={4}/>
          <div style={{ minWidth: "40px", height: "1410px" }}></div>
          <YangchelinGuide />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
