import React, { useEffect, useRef, useState } from "react";
import "./MainPage.css";
import FreeBoardPreview from "./FreeBoardPreview";
import FreeBoard from "./FreeBoard";
import HotArticle from "./HotArticle";
import SearchBar from "../layout/SearchBar";
import YangchelinGuide from "./YangchelinGuide";
import Header from "../layout/header/Header";
import Quot from "../layout/Carousel";
import useDeviceTypeStore from "../../stores/deviceTypeStore";
import Navbar from "../layout/Navbar";

const MainPage = () => {
  const { deviceType } = useDeviceTypeStore();
  const MainBox = useRef(null);

  return (
    <div ref={MainBox} className="MainPageBackground">
      <Header />
      <Quot />

      <div className="Body">
        <div
          className={deviceType === "web" ? "WebSearchBox" : "MobileSearchBox"}
        >
          <SearchBar />
        </div>

        {
          deviceType === "web" ? (
            <>
              <div className="WebCardBox">
                <FreeBoardPreview />
                <div style={{ minWidth: "40px", height: "1410px" }}></div>
                <HotArticle boardId={1} />
              </div>
            
              {/* <div className="CardBox">
                <FreeBoard boardId={3} />
                <div style={{ minWidth: "40px", height: "1410px" }}></div>
                <YangchelinGuide />
              </div> */}
            
            </>
          ) : (
            <div className="MobileCardBox">
              <FreeBoardPreview />
              <HotArticle boardId={1} />
            </div>
          )
        }
      </div>
      <Navbar/>
    </div>
  );
};

export default MainPage;
