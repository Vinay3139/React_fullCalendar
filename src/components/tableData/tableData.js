import React from "react";
import "../reactCalender/reactCalender.css";
export const TableData = ({ eventTitles }) => {
  if (eventTitles) {
    return (
      <div className="table_Data">
        <h4>Event Titles:</h4>
        <div className="table_Head">
        <table>
          <tr>
            <th>Meeting Title</th>
          </tr>
          {eventTitles.map((title, index) => (
            <>
              <tr>
                <td key={index}>{title}</td>
              </tr>
            </>
          ))}
        </table>
        </div>
      </div>
    );
  }
};
