import "./Header.css";
import MiniProfile from "./MiniProfile";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlarmButton from "./AlarmButton";
// import SearchBar from "../../main/SearchBar";
import axios from "axios";
import useDeviceTypeStore from "../../../stores/deviceTypeStore";

const Header = () => {
  const { deviceType } = useDeviceTypeStore();
  const [ScrollActive, setScrollActive] = useState(false);
  const [MobileScrollActive, setMobileScrollActive] = useState(false)
  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const handleScroll = () => {
    console.log("핸들 스크롤 실행", window.scrollY);
    console.log(window);
    setScrollY(window.scrollY);
    if (ScrollY > 40) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }

    if(ScrollY >20){
      setMobileScrollActive(true);
    }else{
      setMobileScrollActive(false)
    }
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", handleScroll);
    }; //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  const [uncheckedAlarms, setUncheckedAlarms] = useState(0);

  const countAlarms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api-alarm/alarm",
        {
          params: {
            userId: JSON.parse(sessionStorage.getItem("loginUser")!).id,
          },
        }
      );
      const uncheckedCount = response.data.filter(
        //@ts-ignore
        (alarm) => alarm.isChecked === 0
      ).length;
      setUncheckedAlarms(uncheckedCount);
    } catch (error) {}
  };

  useEffect(() => {
    countAlarms();
  }, []);

  return (
    <div className={deviceType ==="web"? "HeaderBox" : "MobileHeaderBox"}
    >
      {deviceType === "web" ? (
        <div
          className={
            ScrollActive
              ? "MovingHeader"
              : window.innerWidth < 1200
              ? "NarrowHeader"
              : "Header"
          }
        >
          <div className="ProfileBox">
            <MiniProfile />
          </div>

          <div className="Yangkids">
            <Link to="/" className="DaeMoon">
              YangKids
            </Link>
            {/* {window.scrollY > 500? <SearchBar/>:<div></div>}  */}
          </div>
          <div className="AlarmButtonBox">
            <Link to="/alarm">
              <AlarmButton cnt={uncheckedAlarms} />
            </Link>
          </div>
        </div>
      ) : (
        <div className={MobileScrollActive ? "MovingHeader" : "MobileHeader"}>
          <div className="ProfileBox">
            <MiniProfile />
          </div>

          <div className="Yangkids">
            <Link to="/" className="DaeMoon">
              YangKids
            </Link>
          </div>

          <div className="AlarmButtonBox">
            <Link to="/alarm">
              <AlarmButton cnt={uncheckedAlarms} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
