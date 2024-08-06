import React from "react";
import { Link } from "react-router-dom";
import "../Header/Text.css";

const Text = () => {
  return (
    <nav className="NewMenu">
      <Link className="NewMenuLink NewMenuLinkActive" to="/">
        Главная
      </Link>
      <a className="NewMenuLink" href="xxx">
        Тарифы
      </a>
      <a className="NewMenuLink" href="xxx">
        FAQ
      </a>
    </nav>
  );
};

export default Text;
