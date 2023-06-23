import React, { useEffect } from "react";
import "./App.css";
import Footer from "./components/layout/footer/Footer";
import {Route, Routes, Navigate } from "react-router-dom";
import EnterancePage from "./components/entrance/EnterancePage"
import MainPage from "./components/main/MainPage";
import BoardPage from "./components/board/BoardPage";
import FreeBoard from "./components/board/FreeBoard";
import QuestionBoard from "./components/board/QuestionBoard";
import YangchelinBoard from "./components/board/YangchelinBoard";
import InfoBoard from "./components/board/InfoBoard";
import MyPage from "./components/myPage/MyPage";
import AlarmPage from "./components/alarm/AlarmPage";
import ArticleDetail from "./components/board/ArticleDetail";
import SearchResult from "./components/board/SearchResult";
import ArticleWirteForm from "./components/board/ArticleWriteForm";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const App = () => {

  const [isLogedin, setIsLogedin] = useState(false);

  const location = useLocation();
  useEffect( () => { 
    if(sessionStorage.getItem("loginUser") !== null){
      setIsLogedin(true);
    }else{
      setIsLogedin(false);
    }
  },[location.pathname])

  return (
    <div className="App">
        <Routes>
          <Route
            path="/Alarm"
            element={isLogedin ? <AlarmPage /> : <Navigate to="/Enterance" />}
          />
          <Route path="/MyPage" element={<MyPage />}/>
          <Route path="/Enterance" element={isLogedin? <Navigate to ="/Main"/>: <EnterancePage/>}/>
          <Route path="/" element= {isLogedin? <MainPage /> : <Navigate to="/Enterance" />}/>
          <Route path="/Main" element={isLogedin ? <MainPage /> : <Navigate to="/Enterance" />}/>
          <Route path="/Board" element={isLogedin ? <BoardPage /> : <Navigate to="/Enterance"/>}>
            <Route path="Freeboard" element={<FreeBoard />} />
            <Route path="QuestionBoard" element={<QuestionBoard />}></Route>
            <Route path="InfoBoard" element={<InfoBoard />}></Route>
            <Route path="YangchelinBoard" element={<YangchelinBoard />}></Route>
            <Route path=":articleId" element={<ArticleDetail />}></Route>
            <Route path="SearchResult" element={<SearchResult />}></Route>
            <Route path="Write" element={<ArticleWirteForm />}></Route>
          </Route>
        </Routes>
        <Footer />
    </div>
  );
};

export default App;
