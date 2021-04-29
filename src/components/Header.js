import React from "react";
import logo from "../img/logo.png";

export default function Header({ status }) {
  return (
    <header>
      {status === 1 && <h1>Тренажер "Поле зрения"</h1>}
      <img src={logo} alt="logo" />
    </header>
  );
}
