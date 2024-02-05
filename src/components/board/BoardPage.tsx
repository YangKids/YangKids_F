import React from "react";
import "./BoardPage.css";
import BoardCategory from "./BoardCategory";
import { Outlet } from "react-router-dom";
import Header from "../layout/header/Header";
import Quot from "../layout/Carousel";
import Navbar from "../layout/Navbar";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

const BoardPage = () => {
  const { deviceType } = useDeviceTypeStore();

  return (
    <div className="BoardPageBackground">
      <Header />

      {deviceType === "web" ? (
        <>
          <Quot />
          <div className="Body">
            <BoardCategory />
            <Outlet />
          </div>
        </>
      ) : (
        <>
          <div className="Body">
            <Outlet />
            <Navbar />
          </div>
          
        </>
      )}
    </div>
  );
};

export default BoardPage;
