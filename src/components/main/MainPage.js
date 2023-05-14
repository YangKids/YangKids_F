import React from "react";
import './MainPage.css'
import FreeBoardPreview from "./FreeBoardPreview";
import HotArticle from "./HotArticle";
import SearchBar from './SearchBar';
import YangchelinGuide from './YangchelinGuide';


const MainPage = () => {
    
    return(
    <div className='Body'>


        <div className='SearchBox'><SearchBar /></div>

        <div className='CardBox'>
            <FreeBoardPreview />
            <div style={{ minWidth: '40px', height: '1410px' }}></div>
            <HotArticle />
        </div>

        <div className='CardBox'>
            <HotArticle />
            <div style={{ minWidth: '40px', height: '1410px' }}></div>
            <YangchelinGuide />
        </div>

    </div>

)}

export default MainPage;