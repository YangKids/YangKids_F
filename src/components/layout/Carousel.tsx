import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import "./Carousel.css";
import axios from "axios";
import useDeviceTypeStore from "../../stores/deviceTypeStore";
import { Quotation } from "../../types";

const contentStyle : React.CSSProperties = {
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
  const { deviceType } = useDeviceTypeStore();
  const [quotationList, setQuotationList] = useState<Quotation[]>([
    { content: "캐러셀 컨텐츠" },
  ]);
  useEffect(() => {
    const getQuotation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api-quotation/quotation`
        );
        setQuotationList(res.data);
      } catch (e) {
        setQuotationList([
          { content: "캐러셀 컨텐츠1" },
          { content: "캐러셀 컨텐츠2" },
          { content: "캐러셀 컨텐츠3" },
        ]);
      }
    };
    getQuotation();
  }, []);

  return (
    <div className="CarouselBox">
      <div
        className={
          deviceType === "web"
            ? window.innerWidth < 1200
              ? "NarrowWebCarousel"
              : "WebCarousel"
            : "MobileCarousel"
        }
      >
        <Carousel autoplay autoplaySpeed={4000} dots={false}>
          {quotationList.map((quotation) => (
            <div>
              <h2 style={contentStyle}>{quotation.content}</h2>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default Quot;
