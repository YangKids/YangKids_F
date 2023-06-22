import "./Header.css";
import MiniProfile from "./MiniProfile";

import Menu from "./Menu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import AlarmButton from "./AlarmButton";
// import SearchBar from "../../main/SearchBar";

const Header = () => {
  const [ScrollActive, setScrollActive] = useState(false);

  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장

  function handleScroll() {
    if (ScrollY > 35) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  };

  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "110px",
      }}
    >
      <div className={ScrollActive ? "MovingHeader" : "Header"}>
        <div className="ProfileBox" >
          {sessionStorage.getItem('loginUser') == null? <LoginButton/>:<MiniProfile />}
        </div>

        <div className="Yangkids">
          <Link to="/" className="DaeMoon">
            YangKids
          </Link>
          {/* {window.scrollY > 500? <SearchBar/>:<div></div>}  */}
        </div>

        <div style={{display:'flex', flexDirection:'row', minWidth : '140px'}}>
          <div className="AlarmButtonBox">
            <Link to="/Alarm">
            <AlarmButton />
            </Link>
          </div>
          <div className="MenuBox">
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
