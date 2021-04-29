import React, { useState, useEffect } from "react";
import { words } from "../data/words";
import tilde from "../img/tilde.png";

export default function Words({ settings, toStart, changeStatus }) {
  const gamewords = words
    .split(" ")
    .filter((word) => word.length === +settings.amount);
  const [activeWords, setActiveWords] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [message, setMessage] = useState("");

  const setShowableWords = () => {
    const arr = [];
    for (let i = 0; i < settings.words; i++) {
      arr.push(gamewords[Math.floor(Math.random() * gamewords.length)]);
    }
    setActiveWords(splitWords(arr));
  };

  const splitWords = (words) => {
    return +settings.amount % 2 === 0
      ? splitEvenWords(words)
      : splitOddWords(words);
  };

  const splitEvenWords = (words) => {
    return words.map((word) => {
      return {
        start: word.substring(0, word.length / 2),
        end: word.substring(word.length / 2, word.length),
      };
    });
  };

  const splitOddWords = (words) => {
    return words.map((word, index) => {
      const randomizer = Math.round(Math.random());
      return {
        start: word.substring(0, Math.round(word.length / 2) - randomizer),
        end: word.substring(
          Math.round(word.length / 2) - randomizer,
          word.length
        ),
        margin:
          +settings.starting_distance +
          (+settings.margin * (index + 1)) / settings.words,
      };
    });
  };

  const showActiveWords = (index = 0) => {
    setActiveIndex(index);
    setTimeout(() => {
      index < settings.words - 1 ? showActiveWords(index + 1) : changeStatus();
    }, settings.time * 1000);
  };
  const showLine = (index) => {
    if (index === activeIndex || message !== "") return true;
    else return false;
  };
  useEffect(() => {
    if (gamewords.length > 0) {
      setShowableWords();
      showActiveWords();
    } else setMessage("Слов такой длины нет в базе");
  }, []);
  return (
    <main className="content">
      {activeWords.map(({ start, end, margin }, index) => (
        <div
          key={index}
          className={"content__text-block " + (showLine(index) ? "active" : "")}
        >
          {index === activeIndex && (
            <>
              <h2>{start}</h2>
              <img
                style={{ marginLeft: margin * 3, marginRight: margin * 3 }}
                src={tilde}
                alt="tilde"
              />

              <h2>{end}</h2>
            </>
          )}
        </div>
      ))}
      {message !== "" && (
        <div className="content__message">
          <h2>{message}</h2>
          <div className="content__message-button">
            <button onClick={toStart}>Назад</button>
          </div>
        </div>
      )}
    </main>
  );
}
