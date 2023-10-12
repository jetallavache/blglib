import React from "react";
import "./index.css";

export const ArchivePage = (listMeetings) => {

  const listItems = (listMeetings.listMeetings)?.map((miting, index) =>
    <div className="project" key={index}>
      <p>{miting.date}</p>
      <p>„{miting.title}“ <span>{miting.firstName} {miting.familyName}</span></p>
      <p>
        <span>{miting.place}</span>
      </p>
    </div>
  );

  return (
    <div className="project-container">
      <div className="project-header">
        <span>Ар</span>хив
      </div>

      <div className="project-list">
        {listItems}
      </div>
    </div>
  );
};


// import { people } from './data.js';
// import { getImageUrl } from './utils.js';

// export default function List() {
//   const listItems = people.map(person =>
//     <li key={person.id}>
//       <img
//         src={getImageUrl(person)}
//         alt={person.name}
//       />
//       <p>
//         <b>{person.name}:</b>
//         {' ' + person.profession + ' '}
//         known for {person.accomplishment}
//       </p>
//     </li>
//   );


//   return (
//     <article>
//       <h1>Scientists</h1>
//       <ul>{listItems}</ul>
//     </article>
//   );
// }