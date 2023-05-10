import React from 'react';
import './components.css'
import { useState, useEffect } from 'react';
import ArticleList from './ArticleList';



const FreeBoard = () => {


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

            <div className={ScrollY > 1210 ? 'FixedList' : ScrollY > 380 ? 'MovingList' : 'List'}>
                <div className='FreeBoardContents'>
                    <div className='Title'>
                        자유게시판
                    </div>
                    <div className='Articles'>
                        <ArticleList/>
                    </div>

                </div>
            </div>


        </div>


    )



}

export default FreeBoard;