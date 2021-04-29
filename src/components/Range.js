import React, { useState, useEffect } from "react";

export default function Range({
  watch,
  header,
  name,
  register,
  min,
  max,
  step,
}) {
  const [marks, setMarks] = useState([]);
  const inputValue = watch(name);
  useEffect(() => {
    const arr = [];
    for (let i = min; i <= max; i += step) arr.push(i);
    setMarks(arr);
  }, []);
  return (
    <div className="settings__block">
      <h2>{header}</h2>
      <div className="settings__range">
        <ul>
          {marks.map((mark) => (
            <li className={mark === +inputValue ? "active" : ""} key={mark}>
              {mark}
            </li>
          ))}
        </ul>
        <input
          {...register(name)}
          type="range"
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
}
