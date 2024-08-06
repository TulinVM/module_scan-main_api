import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import "./App.css";
import { setScreenWidth } from "./Requests/app";
import { getCompanyInfo } from "./Requests/profile";

function App() {
  const dispatch = useDispatch();
  const companyQuantityInfo = useSelector((state) => state.profile.companyInfo);

  useEffect(() => {
    // Обработчик изменения размера экрана
    const handleResize = () => {
      dispatch(setScreenWidth(window.innerWidth));
    };

    // Установка слушателя события
    window.addEventListener("resize", handleResize);

    // Инициализация: получение информации о компании
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !companyQuantityInfo) {
      dispatch(getCompanyInfo());
    }

    // Удаление слушателя при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, companyQuantityInfo]);

  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
