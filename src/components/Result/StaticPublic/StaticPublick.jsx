import React, { useState, useEffect } from "react";
import "./StaticPublick.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { ReactComponent as RightChevron } from "../Media/right.svg";
import { ReactComponent as LeftChevron } from "../Media/left.svg";
import Period from "./Period";
import Whait from "../Media/Whait.gif";

const StaticDesktop = () => {
  const [loading, setLoading] = useState(true);
  const summary = useSelector((state) => state.histograms.histogramInfo);
  const newWidth = useSelector((state) => state.app.width);
  const maxSlideNumber = Math.min(summary?.length || 0, 8);
  const slidesToShow = newWidth < 700 ? 1 : maxSlideNumber;

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadData();
  }, []);

  const Arrow = ({ direction, className, style, onClick }) => {
    const ArrowIcon = direction === "left" ? LeftChevron : RightChevron;
    return (
      <ArrowIcon
        className={className}
        style={{
          ...style,
          width: "30px",
          height: "30px",
          display: "block",
          [direction === "left" ? "left" : "right"]:
            direction === "left" ? "-15%" : "-33px",
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    slidesToScroll: 1,
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: slidesToShow,
    swipeToSlide: true,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
  };

  return (
    <div className="greenBlock">
      <div className="sections">
        <section>Период</section>
        <section>Всего</section>
        <section>Риски</section>
      </div>
      <div className="slider-wrapper">
        {loading ? (
          <div className="loading-message">
            <img
              src={Whait}
              alt="Loading"
              style={{ width: "110px", height: "110px" }}
            />
            <p>Загружаем данные...</p>
          </div>
        ) : summary?.length <= 1 ? (
          summary.map((period) => (
            <Period
              key={period.date}
              className="periodItemCss"
              date={period.date}
              total={period.total}
              risk={period.risk}
            />
          ))
        ) : (
          <Slider {...settings}>
            {summary.map((period) => (
              <Period
                key={period.date}
                className="periodItemCss"
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

export default StaticDesktop;
