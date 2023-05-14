import React from "react";
import "./App.css";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/main/MainPage";
import Quot from "./components/layout/Carousel";
import BoardPage from "./components/board/BoardPage";
import FreeBoard from "./components/board/FreeBoard";
import QuestionBoard from "./components/board/QuestionBoard";
import YangchelinBoard from "./components/board/YangchelinBoard";
import InfoBoard from "./components/board/InfoBoard";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Quot />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/Board" element={<BoardPage />}>
            <Route path="Freeboard" element={<FreeBoard />} />
            <Route path="QuestionBoard" element={<QuestionBoard />}></Route>
            <Route path="InfoBoard" element={<InfoBoard />}></Route>
            <Route path="YangchelinBoard" element={<YangchelinBoard />}></Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};
export default App;
