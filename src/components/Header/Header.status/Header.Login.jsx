import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Header.Login.css";
import { getCompanyInfo } from "../../Requests/profile";
import Wait from "../Media/whait.svg";

const Login = () => {
  const companyQuantityInfo = useSelector((state) => state.profile.companyInfo);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!companyQuantityInfo) {
      const fetchData = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        dispatch(getCompanyInfo());
        setIsLoading(false);
      };
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [companyQuantityInfo, dispatch]);

  if (isLoading) {
    return (
      <div className="Load">
        <img className="Img_load" src={Wait} alt="Loading" />
      </div>
    );
  }

  return (
    <div className="NewCompanyBox">
      <div>
        <span className="NewCompanyBox__usedCompany">
          Использовано компаний
        </span>
        <span className="NewCompanyBox__black">
          {companyQuantityInfo.eventFiltersInfo.usedCompanyCount}
        </span>
      </div>
      <div>
        <span className="NewCompanyBox__usedCompany">Лимит по компаниям</span>
        <span className="NewCompanyBox__green">
          {companyQuantityInfo.eventFiltersInfo.companyLimit}
        </span>
      </div>
    </div>
  );
};

export default Login;
