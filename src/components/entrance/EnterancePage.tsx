import React, { useEffect, useState } from "react";
import "./EnterancePage.css";
import { Link } from "react-router-dom";
import LoginCard from "./LoginCard";
import Footer from "../layout/footer/Footer";





const EnterancePage = () => { 

  return (
    <div className="Enterance">
      <div className="Ganpan"><Link to='/Enterance'>YangKids</Link></div>
      <LoginCard/>
      <Footer />
    </div>
  );
};
export default EnterancePage;