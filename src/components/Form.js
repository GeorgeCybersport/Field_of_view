import React from "react";
import { useForm } from "react-hook-form";
import { settingsData } from "../data/settingsData";
import Range from "./Range";

export default function Form({ onSubmit }) {
  const { register, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      amount: "3",
      margin: "5",
      starting_distance: "5",
      words: "1",
      time: "1",
    },
  });
  const activeTime = watch("time");

  const plusTime = () =>
    +activeTime < 5 && setValue("time", String(+activeTime + 0.5));
  const minusTime = () => {
    +activeTime > 1 && setValue("time", String(+activeTime - 0.5));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="settings">
      {settingsData.map(({ name, min, max, step, header }, index) => (
        <Range
          key={index}
          name={name}
          min={min}
          max={max}
          step={step}
          header={header}
          register={register}
          watch={watch}
        />
      ))}

      <div className="settings__block">
        <h2>
          Скорость <input {...register("time")} type="text" />
          сек
        </h2>
        <div className="settings__block-buttons">
          <button onClick={plusTime} type="button">
            <span>+</span>
          </button>
          <button onClick={minusTime} type="button">
            <span>-</span>
          </button>
        </div>
      </div>
      <div className="settings__start-button">
        <button>Старт</button>
      </div>
    </form>
  );
}
