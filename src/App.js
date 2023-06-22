import React from "react";
import "./App.css";
import Footer from "./components/layout/footer/Footer";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MainPage from "./components/main/MainPage";
import BoardPage from "./components/board/BoardPage";
import FreeBoard from "./components/board/FreeBoard";
import QuestionBoard from "./components/board/QuestionBoard";
import YangchelinBoard from "./components/board/YangchelinBoard";
import InfoBoard from "./components/board/InfoBoard";
import EnterancePage from "./components/entrance/EnterancePage";
import MyPage from "./components/myPage/MyPage";
import AlarmPage from "./components/alarm/AlarmPage";
import ArticleDetail from "./components/board/ArticleDetail";
import SearchResult from "./components/board/SearchResult";
import ArticleWirteForm from "./components/board/ArticleWriteForm";
import { useState } from "react";



const App = () => {

  const [isLogedin, setIsLogedin] = useState(true);

  const checkLogin = () => {
    if(window.sessionStorage.getItem("user") !== null){
      setIsLogedin(true);
    }
  }


  return (
    <div className="App">
      <BrowserRouter>
        
        <Routes>
        <Route path="/Alarm" element={isLogedin? <AlarmPage/>: <Navigate to = "/Enterance"/>}/>
          <Route path="/MyPage" element={<MyPage/>}></Route>
          <Route path="/Enterance" element={<EnterancePage/>}></Route>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/Board" element={<BoardPage />}>
            <Route path="Freeboard" element={<FreeBoard />} />
            <Route path="QuestionBoard" element={<QuestionBoard />}></Route>
            <Route path="InfoBoard" element={<InfoBoard />}></Route>
            <Route path="YangchelinBoard" element={<YangchelinBoard />}></Route>
            <Route path=":articleId" element={<ArticleDetail/>}></Route>
            <Route path="SearchResult" element={<SearchResult/>}></Route>
            <Route path="Write" element={<ArticleWirteForm/>}></Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};



export default App;
