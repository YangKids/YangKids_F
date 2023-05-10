import './header.css';
import MiniProfile from './MiniProfile';

import Menu from './Menu';
import Alarm from './Alarm';
import { useEffect, useState } from 'react';





const Navbar = () => {

  const [ScrollActive, setScrollActive] = useState(false);



  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  function handleScroll() { 
      if(ScrollY > 35) {
          setScrollY(window.pageYOffset);
          setScrollActive(true);
      } else {
          setScrollY(window.pageYOffset);
          setScrollActive(false);
      }
  }
  useEffect(() => {
      function scrollListener() {  window.addEventListener("scroll", handleScroll); } //  window 에서 스크롤을 감시 시작
      scrollListener(); // window 에서 스크롤을 감시
      return () => { window.removeEventListener("scroll", handleScroll); }; //  window 에서 스크롤을 감시를 종료
  });





  return(
  <div className={ScrollActive? 'MovingHeader': 'Header'}>
    <div className='ProfileBox'><MiniProfile /></div>
    <div className='Yangkids'>Yangkids</div>
    <div className='AlarmBox'><Alarm/></div>
    <div className='MenuBox'><Menu/></div>

  </div>
  )
}

export default Navbar;