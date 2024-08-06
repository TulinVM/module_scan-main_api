import React from "react";
import "./MainStatic.css";
import StaticMenu from "./StaticMenu";

const MainStatic = () => {
  return (
    <div className="MainStatic">
      <h2 className="MainStatic_title">
        <StaticMenu />
      </h2>
    </div>
  );
};

export default MainStatic;
