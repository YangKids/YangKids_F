import React from 'react';
import './MainComponents.css'
import { useState, useEffect } from 'react';
import ArticleList from './ArticleList';
import { Link } from 'react-router-dom';



const FreeBoardPreview = () => {


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

            <div className={ScrollY > 1220 ? 'FixedList' : ScrollY > 397 ? 'MovingList' : 'List'}>
                <div className='FreeBoardContents'>
                    <div className='Title'>
                        <Link to='/Board/NoticeBoard' style={{textDecoration : 'none', color : 'black'}}>공지사항</Link>
                    </div>
                    <div className='Articles'>
                        <ArticleList boardId={0}/>
                    </div>

                </div>
            </div>


        </div>


    )



}

export default FreeBoardPreview;