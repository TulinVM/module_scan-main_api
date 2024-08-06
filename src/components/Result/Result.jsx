import React, { useMemo } from "react";
import "./Result.css";
import Search from "./Media/Searsh.svg";
import { useSelector } from "react-redux";
import PublicationCards from "./Publication/Publication";
import StaticMobile from "./StaticPublic/StaticMobile";
import StaticDesktop from "./StaticPublic/StaticPublick";

const ResultPage = () => {
  const Docs = useSelector((state) => state.histograms.histogramInfo);
  const newWidth = useSelector((state) => state.app.width);

  const isMobile = useMemo(() => newWidth < 700, [newWidth]);
  const ChosenCarousel = useMemo(
    () => (isMobile ? StaticMobile : StaticDesktop),
    [isMobile]
  );

  return (
    <main className="result-main">
      <div className="result-main__wrapper">
        <div className="result-main__upper">
          <div className="upper__box">
            <div className="upper__title">Ищем. Скоро будут результаты</div>
            <section>
              Поиск может занять некоторое время, просим сохранять терпение.
            </section>
          </div>
          <div className="img__box">
            <img src={Search} alt="Поиск" />
          </div>
        </div>
        <div className="result-main__middle">
          <div className="upper__box">
            <h1 className="upper__title upper__title_middle">Общая сводка</h1>
            <section className="result-main__section">
              Найдено {Docs?.length || 0} варианта(ов)
            </section>
          </div>
          <ChosenCarousel />
        </div>
        <div className="result-main__lower">
          <div className="lower__box">
            <h1 className="upper__title upper__title_middle">
              Список документов
            </h1>
            <PublicationCards />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResultPage;
