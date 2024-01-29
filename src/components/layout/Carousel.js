import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import "./Carousel.css";
import axios from "axios";
import useDeviceTypeStore from "../../stores/deviceTypeStore";

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

const Quot = () => {
  const {deviceType} = useDeviceTypeStore();
  const [quotation, setQuotation] = useState([]);
  useEffect(() => {
    const getQuotation = async () => {
      // try {
      const res = await axios.get(
        `http://localhost:8080/api-quotation/quotation`
      );
      setQuotation(res.data);

      // } catch (e) {}
    };
    getQuotation();
  }, []);
  console.log(quotation[0]);

return(

  <div className="CarouselBox">
    <div className={deviceType === "web"? "WebCarousel" : "MobileCarousel"}>
      <Carousel autoplay dots = {false}>
        <div>
          <h2 style={contentStyle}>
            {quotation[0]?quotation[0].content: '로딩중'}
          </h2>
        </div>
        <div>
          <h2 style={contentStyle}>            
          {quotation[1]?quotation[1].content: '로딩중'}</h2>
        </div>
        <div>
          <h2 style={contentStyle}>            
          {quotation[2]?quotation[2].content: '로딩중'}</h2>
        </div>
        <div>
          <h2 style={contentStyle}>            
          {quotation[3]?quotation[3].content: '로딩중'}</h2>
        </div>
      </Carousel>
    </div>
  </div>
);
};
export default Quot;
