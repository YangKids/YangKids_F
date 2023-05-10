import React from 'react';
import './App.css';
import Navbar from './components/layout/header/Header';
import FreeBoard from './components/FreeBoard';
import Footer from './components/layout/Footer';
import HotArticle from './components/HotArticle';
import Quot from './components/carousel';
import SearchBar from './components/SearchBar';
import YangchelinGuide from './components/YangchelinGuide';


const App = () => {
  return (
    <div>
      <div className='Body'>
        <div style={{ height: '100px', display: 'flex', justifyContent: "center", alignContent: "center" }}>
          <Navbar />
        </div>

        <div className='Quotation'><Quot /></div>

        <div className='SearchBox'><SearchBar /></div>

        <div className='CardBox'>
          <FreeBoard />
          <div style={{ minWidth: '40px', height: '1410px'}}></div>
          <HotArticle />
        </div>

        <div className='CardBox'>
        <HotArticle />
        <div style={{ minWidth: '40px', height: '1410px'}}></div>
          <YangchelinGuide/>
        </div>
        <Footer />
      </div>


    </div>


  )
};
export default App;