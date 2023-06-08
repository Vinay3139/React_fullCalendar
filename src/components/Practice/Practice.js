import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CustomView = () => {
  return (
    <div>
     <p>Hello</p>
    </div>
  );
};

const Main = () => {
  const [currentView, setCurrentView] = useState('dayGridMonth');

  const handleCustomViewClick = () => {
    setCurrentView('customView');
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <div>
        <button onClick={handleCustomViewClick}>Custom View</button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView={currentView}
        views={{
          customView: {
            component: CustomView,
          },
        }}
      />
    </div>
  );
};

export default Main;
