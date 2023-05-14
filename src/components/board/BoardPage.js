import React from "react";
import "./BoardPage.css";
import BoardCategory from "./BoardCategory";
import { Outlet } from "react-router-dom";

const BoardPage = () => {
  return (
    <div className="Body">
      <BoardCategory />
      <Outlet/>
    </div>
  );
};

export default BoardPage;
