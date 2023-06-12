import React from "react";
import "./BoardPage.css";
import BoardCategory from "./BoardCategory";
import { Outlet } from "react-router-dom";
import Header from "../layout/header/Header";
import Quot from "../layout/Carousel";

const BoardPage = () => {
  return (
    <div>
      <Header />
      <Quot />
      <div className="Body">
        <BoardCategory />
        <Outlet />
      </div>
    </div>
  );
};

export default BoardPage;
