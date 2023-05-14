import "./Header.css";
import MiniProfile from "./MiniProfile";

import Menu from "./Menu";
import Alarm from "./Alarm";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
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

  // let sessionStorage = window.sessionStorage;
  // sessionStorage.setItem(userId)

  const user ={
    id : '1',
    userId : 'jjwoong1733',
    name : '정재웅'
  }

  let localStorage = window.localStorage;
  localStorage.setItem('user', user);
  console.log(localStorage.getItem('user'))


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
          {/* {sessionStorage.getItem()?<MiniProfile />:<LoginButton/>} */}
          {localStorage.getItem('user') == null?<MiniProfile />:<LoginButton/>}
        </div>

        <div className="Yangkids">
          <Link to="/" className="DaeMoon">
            Yangkids
          </Link>
          {/* {window.scrollY > 500? <SearchBar/>:<div></div>}  */}
        </div>

        <div style={{display:'flex', flexDirection:'row', minWidth : '140px'}}>
          <div className="AlarmBox">
            <Alarm />
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
