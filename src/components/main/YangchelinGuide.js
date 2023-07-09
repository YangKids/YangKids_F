import React from 'react';
import './MainComponents.css'
import { useState, useEffect } from 'react';
import ArticleList from './ArticleList';



const YangchelinGuide = () => {


    const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
    //   function handleScroll() { 
    //       if(ScrollY > 350 & ScrollY < 730 ) {
    //           setScrollY(window.pageYOffset);
    //       } else {
    //           setScrollY(window.pageYOffset);
    //       }
    //   }

    function handleScroll() {
        setScrollY(window.pageYOffset);
    }
    useEffect(() => {
        function scrollListener() { window.addEventListener("scroll", handleScroll); } //  window 에서 스크롤을 감시 시작
        scrollListener(); // window 에서 스크롤을 감시
        return () => { window.removeEventListener("scroll", handleScroll); }; //  window 에서 스크롤을 감시를 종료
    });



    return (

        <div className='ListBox'>

            <div className={ScrollY > 2680? 'FixedYangchelinBox' : ScrollY > 1860 ? 'MovingYangchelinBox' : 'YangchelinBox'}>
                <div className='FreeBoardContents'>
                    <div className='Title'>
                        양슐랭 가이드
                    </div>
                    <div className='Articles'>
                        <ArticleList boardId={4}/>
                    </div>

                </div>
            </div>


        </div>


    )



}

export default YangchelinGuide;