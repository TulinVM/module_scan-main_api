import React, { useState, useEffect } from "react";
import "./StaticPublick.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { ReactComponent as RightChevron } from "../Media/right.svg";
import { ReactComponent as LeftChevron } from "../Media/left.svg";
import Period from "./Period";
import Whait from "../Media/Whait.gif";

// Общий компонент для стрелок
const Arrow = ({ className, style, onClick, direction }) => {
  const ArrowIcon = direction === "left" ? LeftChevron : RightChevron;
  return (
    <ArrowIcon className={className} style={{ ...style }} onClick={onClick} />
  );
};

const StaticMobile = () => {
  const [loading, setLoading] = useState(true);
  const summary = useSelector((state) => state.histograms.histogramInfo);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadData();
  }, []);

  const settings = {
    slidesToScroll: 1,
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    swipeToSlide: true,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
  };

  return (
    <div className="blockMobile">
      <div className="sectionsMobile">
        <section className="sectionsMobile__item">Период</section>
        <section className="sectionsMobile__item">Всего</section>
        <section className="sectionsMobile__item">Риски</section>
      </div>
      <div className="slider-wrapperMobile">
        {loading ? (
          <div className="loading-message">
            <img
              src={Whait}
              alt="Loading"
              style={{ width: "50px", height: "50px" }}
            />
            <p>Загружаем данные...</p>
          </div>
        ) : (
          <Slider {...settings}>
            {summary.map((period) => (
              <Period
                key={period.date}
                className="periodItemCssMobile"
                date={period.date}
                total={period.total}
                risk={period.risk}
              />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default StaticMobile;
