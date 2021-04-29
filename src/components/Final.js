import React, { useEffect, useState } from "react";
import final from "../img/final.png";

export default function Final() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(true);
  }, []);
  return (
    <section className={"congratulations " + (active ? "active" : "")}>
      <img src={final} alt="congratulations" />
      <h2>Отличная работа</h2>
    </section>
  );
}
