import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { RiChatDeleteFill } from "react-icons/ri";
import { useRef, useState } from "react";
import "./reactCalender.css";
import { Button, Typography } from "@mui/material";
import { TableData } from "../tableData/tableData";

export const ReactCalender = (index) => {
  const Ref = useRef(null);
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [meetingDate, setMeetingDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedColor, setSelectedColor] = useState("red");
  const [showCustomComponent, setShowCustomComponent] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [eventTitles, setEventTitles] = useState([]);
  function ShowComponent() {
    setCalendarView("TableData");
    setShowCustomComponent(true);
  }

  const views = {
    TableData: {
      type: "custom",
      component: TableData,
    },
  };

  

  function handleTitleChange(e) {
    setMeetingTitle(e.target.value);
  }

  function selected() {
    setMeetingTitle("");
  }

  function handleEventClick(check) {
    setSelectedEventData({
      title: check.event.title,
      start: check.event.startStr,
      end: check.event.endStr,
    });
    setSelectedEvent(check.event);
  }

  function handleClosePopup() {
    setSelectedEvent(null);
  }

  function handleSubmit() {
    if (meetingTitle.trim() !== "" && meetingDate !== null) {
      const x = Ref.current.getApi();
      x.addEvent({
        title: meetingTitle,
        start: meetingDate,
        end: meetingDate,
        extendedProps: { description: description },
        backgroundColor: selectedColor,
      });
      setEventTitles((prevTitles) => [...prevTitles, meetingTitle]);
      setMeetingTitle("");
      setDiscription("");
      setMeetingDate("");
    }
  }
  function ShowIcon(info) {
    const handleDelete = (event) => {
      const x = Ref.current.getApi();
      x.getEventById(event.id).remove();
    };

    const handleDeleteButtonClick = (event) => {
      handleDelete(event);
      setSelectedEvent(null);
    };
    return (
      <>
        <div className="main_wrapper">
          <div
            style={{
              backgroundColor: info.event.backgroundColor,
            }}
            className="delete_Span"
          >
            {info.event.title}
          </div>
          <div style={{ marginRight: "6px" }}>
            <RiChatDeleteFill
              onClick={() => handleDeleteButtonClick(info.event)}
            />
          </div>
        </div>
      </>
    );
  }

  function AddDescription(e) {
    setDiscription(e.target.value);
  }

  function handleColorChange(e) {
    setSelectedColor(e.target.value);
  }

  function handleViewRender() {
    if (calendarView === "customView") {
      setShowCustomComponent(true);
    } else {
      setShowCustomComponent(false);
    }
  }
  const customButtons={
    customButton: {
      // type: "custom",
      text: "Event Titles",
      click: ShowComponent,
      ariaPressed:true
    },
  }
  return (
    <>
      <div style={{ width: "100%", display: "inline-block" }}>
        <h4>React Calendar</h4>
        <div className="Input_Changes">
          <label for="Meeting">Add Meeting:</label>
          <input
            type="text"
            onChange={handleTitleChange}
            value={meetingTitle}
            placeholder="Meeting Title"
          />
          <label for="SelectDate">Select Meeting Date:</label>
          <input
            type="date"
            onChange={(e) => setMeetingDate(e.target.value)}
            value={meetingDate}
          ></input>
          <label for="Description">Add Discription:</label>
          <input
            onChange={AddDescription}
            value={description}
            placeholder="Enter Description"
          ></input>
          <label for="option">Select Events:</label>
          <select
            style={{ marginLeft: "4px", height: "33px" }}
            onChange={handleColorChange}
            value={selectedColor}
          >
            <option value="green">Task</option>
            <option value="cadetblue">Class</option>
            <option value="gray">Birthday</option>
            <option value="blue">Meeting</option>
          </select>

          <Button
            onClick={handleSubmit}
            variant="outlined"
            className="button_Click"
            style={{ marginLeft: "4%" }}
          >
            Add Meeting
          </Button>
        </div>
        
       


        <FullCalendar
          viewDidMount={handleViewRender}
          views={views}
          ref={Ref}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          selectable={true}
          editable={true}
          select={selected}
          eventClick={handleEventClick}
          eventContent={ShowIcon}
          customButtons={customButtons}
          viewSkeletonRender={TableData}
          headerToolbar={{
            start: "today ,prevYear, prev, next, nextYear",
            center: "title",
            end: "dayGridMonth ,timeGridWeek, timeGridDay, customButton",
          }}
         
          
        />
       
            {showCustomComponent && calendarView === "TableData" && (
              <TableData
                eventTitles={eventTitles}
                selectedEvent={selectedEventData}
              ></TableData>
            )}
         
      </div>
      {selectedEvent && (
        <div className="Typography">
          <Typography variant="subtitle1" component="div">
            <h3>{selectedEvent.title}</h3>
            <p>Start: {selectedEvent.startStr}</p>
            <p>End: {selectedEvent.endStr}</p>
          </Typography>
          <br />
          <Button variant="outlined" onClick={handleClosePopup}>
            Close
          </Button>
          <p>Description:{selectedEvent.extendedProps.description}</p>
        </div>
      )}
    </>
  );
};
