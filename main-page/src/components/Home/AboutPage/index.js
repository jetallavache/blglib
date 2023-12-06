import React from "react";
import "./index.css";

export const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        О <span>нас</span>
      </div>
      <div className="about-info">
        <div className="about-left">
          Мы небольшой книжный клуб из Новосибирска.
        </div>
        <div className="about-right">
          <p>
            Я Женя. Люблю читать <span>книги</span>. Однажды придумала
            <span>вот такую</span> штуку.
          </p>
          <p>
            Пока это <span>тестовый</span> формат
            <span> НО</span> надеюсь ты придумаешь хорошую втсавку сюда
          </p>
          <p>
            А возможно и сюда <span>КОНЕЦ</span>
          </p>
        </div>
      </div>
    </div>
  );
};
