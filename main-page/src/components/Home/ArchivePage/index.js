import React from "react";
import "./index.css";

export const ArchivePage = (listMeetings) => {

  const listItems = (listMeetings.listMeetings)?.map((miting, index) =>
    <div className="archive" key={index}>
      <p><span>{miting.date}</span></p>
      <p>„{miting.title}“ {miting.firstName} {miting.familyName}</p>
      <p>{miting.place}</p>
    </div>
  );

  return (
    <div className="archive-container">
      <div className="archive-header">
        <span>Ар</span>хив
      </div>

      <div className="archive-list">
        {listItems}
      </div>
    </div>
  );
};
