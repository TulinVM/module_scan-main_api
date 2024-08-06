import React, { memo, useMemo } from "react";
import "./StaticPublick.css";

const Period = ({ date, risk, total, ...rest }) => {
  // Мемоизация вычисления даты
  const customDate = useMemo(() => {
    const dateObj = new Date(date);
    return `${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
  }, [date]);

  return (
    <div {...rest} className="period__container">
      <div className="period__item">
        <div className="period__text">{customDate}</div>
      </div>
      <div className="period__item">
        <div className="period__text">{total}</div>
      </div>
      <div className="period__item">
        <div className="period__text">{risk}</div>
      </div>
    </div>
  );
};

export default memo(Period);
