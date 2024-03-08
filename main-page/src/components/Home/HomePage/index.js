import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import './index.css';

export const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="home-page">
        <div>
          <span>Привет,</span>
          <p>
            это<span> „Булгаковская библиотека“</span>
          </p>
          <p>
            и это по любви!
          </p>
        </div>
      </div>

      <div className="home-page-footer">
        <a
          href="https://www.instagram.com/blg.lib/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://t.me/heresunny/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramIcon />
        </a>
      </div>
    </div>
  );
};
