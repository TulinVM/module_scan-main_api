import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Inputs from "../Input/Input";
import "./Form.css";
import AuthFooter from "../AuthFooter/AuthFooter";
import { dropStatus, signIn } from "../../Requests/profile";

const Form = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signInStatus = useSelector((state) => state.profile.status);

  useEffect(() => {
    if (signInStatus === "done") {
      navigate("/");
      dispatch(dropStatus());
    } else if (signInStatus === "error") {
      setError(true);
    }
  }, [signInStatus, navigate, dispatch]);

  const handleSubmit = useCallback(() => {
    dispatch(signIn({ login, password }));
  }, [dispatch, login, password]);

  const submitDisabled = !login || !password;

  return (
    <div className="NewForm">
      <div className="NewForm_Box">
        <a className="NewForm_link" href="xxx">
          Войти
        </a>
        <a className="NewForm_link NewForm_link_noactive" href="xxx">
          Зарегистрироваться
        </a>
      </div>
      <Inputs
        login={login}
        password={password}
        setLogin={setLogin}
        setPassword={setPassword}
        error={error}
      />
      <button
        className="NewButton"
        onClick={handleSubmit}
        disabled={submitDisabled}
        style={{ opacity: submitDisabled ? "50%" : "100%" }}
      >
        Войти
      </button>
      <a className="NewForm_nopass" href="xxx">
        Восстановить пароль
      </a>
      <AuthFooter />
    </div>
  );
};

export default Form;
