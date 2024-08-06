import React from "react";
import "./Authorization.css";
import LogoImage from "./Media/Logo_image.svg";
import Lock from "./Media/Lock.svg";
import Form from "./Form/Form";
import { useSelector } from "react-redux";

const Authorization = () => {
  const width = useSelector((state) => state.app.width);
  const isLogoHidden = width < 1270;

  return (
    <main className="NewLogin">
      <div className="NewLogin_wr">
        <div className="NewLeftBox">
          <h1 className="NewLogin_title">
            Для оформления подписки на тариф, необходимо авторизоваться.
          </h1>
          {!isLogoHidden && (
            <img className="NewLogin_img" src={LogoImage} alt="Logo" />
          )}
        </div>
        <div className="NewRightBox">
          <img className="NewLogin_lock" src={Lock} alt="Lock" />
          <Form />
        </div>
        {isLogoHidden && (
          <img className="NewLogo_img" src={LogoImage} alt="Logo" />
        )}
      </div>
    </main>
  );
};

export default Authorization;
