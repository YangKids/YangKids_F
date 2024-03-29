import React, { useEffect } from "react";
import "./App.css";
import Footer from "./components/layout/footer/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import EntrancePage from "./components/entrance/EntrancePage";
import MainPage from "./components/main/MainPage";
import BoardPage from "./components/board/BoardPage";
import FreeBoard from "./components/board/FreeBoard";
import QuestionBoard from "./components/board/QuestionBoard";
import YangchelinBoard from "./components/board/YangchelinBoard";
import InfoBoard from "./components/board/InfoBoard";
import SignupPage from "./components/entrance/SignupPage";
import FindPage from "./components/entrance/FindPage";
import MyPage from "./components/myPage/MyPage";
import AlarmPage from "./components/alarm/AlarmPage";
import ArticleDetail from "./components/board/ArticleDetail";
import SearchResult from "./components/board/SearchResult";
import ArticleWirteForm from "./components/board/ArticleWriteForm";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import EditArticle from "./components/board/EditArticle";
import NoticeBoard from "./components/board/NoticeBoard";
import useDeviceTypeStore from "./stores/deviceTypeStore"

const App = () => {
  const {setDeviceType} = useDeviceTypeStore();
  const [isLogedin, setIsLogedin] = useState(false);

  const location = useLocation();
  useEffect(() => {

    if(window.innerWidth > window.innerHeight){
      setDeviceType("web")
    }else if(window.innerHeight >850){
      setDeviceType("mobile")
    }else{
      setDeviceType("smallMobile")
    }


    if (sessionStorage.getItem("loginUser") !== null) {
      setIsLogedin(true);
    } else {
      setIsLogedin(false);
    }
  }, [location.pathname]);

  return (
    <div className="App">

        <Routes>
          <Route
            path="/alarm"
            element={isLogedin ? <AlarmPage /> : <Navigate to="/entrance" />}
          />

          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/find" element={<FindPage />}></Route>
          <Route path="/myPage" element={<MyPage />} />
          <Route
            path="/entrance"
            element={isLogedin ? <Navigate to="/" /> : <EntrancePage />}
          />
          {/* <Route
            path="/"
            element={isLogedin ? <MainPage /> : <Navigate to="/entrance" />}
          /> */}
           <Route
            path="/"
            element={ <MainPage /> }
          />
          <Route
            path="/board"
            // element={isLogedin ? <BoardPage /> : <Navigate to="/entrance" />}
            element={<BoardPage />}
          >
            <Route path="notice" element={<NoticeBoard />} />
            <Route path="free" element={<FreeBoard />} />
            <Route path="question" element={<QuestionBoard />}></Route>
            <Route path="info" element={<InfoBoard />}></Route>
            <Route path="yangchelin" element={<YangchelinBoard />}></Route>
            <Route path=":articleId" element={<ArticleDetail />}></Route>
            <Route path="searchresult" element={<SearchResult />}></Route>
            <Route path="write" element={<ArticleWirteForm />}></Route>
            <Route path="edit" element={<EditArticle />}></Route>
          </Route>
        </Routes>
    </div>
  );
};

export default App;
