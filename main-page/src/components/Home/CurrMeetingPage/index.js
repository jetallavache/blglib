import React from "react";
import "./index.css";

export const CurrMeetingPage = ({
  title,
  firstName,
  familyName,
  imageUrl,
  date,
  place,
  isEditable,
}) => {
  return (
    <div className="curr-meeting-container">
      <div className="curr-meeting-header">
        Встреча <span>клуба</span>
      </div>
      <div className="curr-meeting-info">
        <div className="curr-meeting-left">
          <p>
            <span>{date}</span> состоится очередная встреча
            нашего книжного клуба
          </p>
          <p>
            Место проведения: <span>{place}</span>
          </p>
          <p>
            Обсуждаем произведение <span>„{title}“</span> (<span>{firstName} {familyName}</span>)
          </p>
        </div>
        <div className="curr-meeting-right">
          {imageUrl && (
            <img className="curr-meeting-img" src={imageUrl[0]} />
          )}
        </div>
      </div>
    </div>
  );
};
