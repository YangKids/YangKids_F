import {useRef} from "react";
import "./MainPage.css";
import NoticeCard from "./NoticeCard";
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
                <NoticeCard />
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
              <NoticeCard />
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
