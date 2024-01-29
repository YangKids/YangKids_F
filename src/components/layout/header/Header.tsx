import "./Header.css";
import MiniProfile from "./MiniProfile";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlarmButton from "./AlarmButton";
// import SearchBar from "../../main/SearchBar";
import axios from "axios";
import useDeviceTypeStore from "../../../stores/deviceTypeStore";

const Header = () => {
  const {deviceType} = useDeviceTypeStore()
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
  }

  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScroll);
    } //  window 에서 스크롤을 감시 시작
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "110px",
      }}
    >
      <div className={deviceType !== "web"?"MobileHeader" : ScrollActive ? "MovingHeader" : "Header"}>
        <div className="ProfileBox">
          <MiniProfile />
        </div>

        <div className="Yangkids">
          <Link to="/" className="DaeMoon">
            YangKids
          </Link>
          {/* {window.scrollY > 500? <SearchBar/>:<div></div>}  */}
        </div>

        <div
          style={{ display: "flex", flexDirection: "row", minWidth: "140px" }}
        >
          <div className="AlarmButtonBox">
            <Link to="/Alarm">
              <AlarmButton cnt={uncheckedAlarms} />
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