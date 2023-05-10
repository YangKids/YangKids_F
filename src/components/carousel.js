
import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  height: '250px',
  color: 'black',
  lineHeight: '250px',
  textAlign: 'center',
  background: '#000000',
  backgroundImage : `url('/img/bonobonobanner.png')`,
  backgroundSize : '1200px 250px',
  borderRadius: '20px',
};
const Quot = () => (
  <Carousel autoplay>
    <div>
      <h2 style={contentStyle}>
        안녕하세요 여러분. 양명균입니다. 줄바꿈은 어떻게하는걸까요
        </h2>
    </div>
    <div>
      <h2 style={contentStyle}>이상하네요?</h2>
    </div>
    <div>
      <h2 style={contentStyle}>커피 대신 명예를 드리겠습니다.</h2>
    </div>
    <div>
      <h2 style={contentStyle}>맥주 마시고 싶다.</h2>
      
    </div>
  </Carousel>
);
export default Quot;