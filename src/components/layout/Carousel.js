import React from "react";
import { Carousel } from "antd";
import "./Carousel.css";
const contentStyle = {
  height: "250px",
  color: "white",
  lineHeight: "250px",
  textAlign: "center",
  background: "",
  backgroundImage: ` linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)
  ), url('/img/surprised_cat.png')`,
  backgroundSize: "600px 250px",
  borderRadius: "20px",
};

const Quot = () => (
  <div className="CarouselBox">
    <div className="Carousel">
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
    </div>
  </div>
);
export default Quot;
