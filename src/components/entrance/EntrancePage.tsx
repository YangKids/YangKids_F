import React, { useEffect, useState } from "react";
import "./EntrancePage.css";
import { Link } from "react-router-dom";
import LoginCard from "./LoginCard";
import Footer from "../layout/footer/Footer";





const EntrancePage = () => { 

  return (
    <div className="Entrance">
      <div className="Ganpan"><Link to='/entrance'>YangKids</Link></div>
      <LoginCard/>
      <Footer />
    </div>
  );
};
export default EntrancePage;