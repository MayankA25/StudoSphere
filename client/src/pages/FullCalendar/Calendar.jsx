import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddTodoModal from "../../components/AddTodoModal/AddTodoModal";
import { useTodoStore } from "../../store/useTodoStore";
import toast from "react-hot-toast";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAuthStore } from "../../store/useAuthStore";

export default function Calendar() {
  const { resetDetails, todos, changeHandler, setDetails } = useTodoStore();
  const { user } = useAuthStore();
  const calendarRef = useRef(null);
  return (
    <div className="md:pt-18 pt-12">
      <AddTodoModal />
      <FullCalendar
        ref={calendarRef}
        height={950}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        weekends={true}
        editable={true}
        selectable={true}
        select={(arg) => {
          const start = new Date(arg.startStr);
          const end = new Date(arg.endStr);

          // In dayGrid, end is exclusive, so subtract 1 day
          const duration = (end - start) / (1000 * 60 * 60 * 24);

          if (duration === 1) {
            return;
          } 

          console.log("Called Select");
          let newStartDate;
          let newEndDate;

          console.log(arg.view.type);

          if (
            arg.view.type.startsWith("timeGridDay") ||
            arg.view.type.startsWith("timeGridWeek")
          ) {
            console.log("Day Grid");
            const tempStartDate = new Date(arg.start);
            // tempStartDate.setHours(tempStartDate.getHours() + 5);
            // tempStartDate.setMinutes(tempStartDate.getMinutes() + 30);
            // newStartDate = tempStartDate
            //   .toISOString()
            //   .split(".")[0]
            //   .slice(0, 16);
            // console.log(newStartDate);
            newStartDate = `${`${tempStartDate.getFullYear()}`}-${`${tempStartDate.getMonth() + 1}`.padStart(2, "0")}-${`${tempStartDate.getDate()}`.padStart(2, "0")}T${`${tempStartDate.getHours()}`.padStart(2, "0")}:${`${tempStartDate.getMinutes()}`.padStart(2, "0")}`
            const tempEndDate = new Date(arg.end);
            // tempEndDate.setHours(tempEndDate.getHours() + 5);
            // tempEndDate.setMinutes(tempEndDate.getMinutes() + 30);
            // newEndDate = tempEndDate.toISOString().split(".")[0].slice(0, 16);
            // console.log(newEndDate);
            newEndDate = `${`${tempEndDate.getFullYear()}`}-${`${tempEndDate.getMonth() + 1}`.padStart(2, "0")}-${`${tempEndDate.getDate()}`.padStart(2, "0")}T${`${tempEndDate.getHours()}`.padStart(2, "0")}:${`${tempEndDate.getMinutes()}`.padStart(2, "0")}`
          }
          resetDetails(false);
          console.log(arg.startStr, arg.endStr);
          // if (
          //   arg.startStr < new Date(Date.now()).toISOString().split("T")[0] ||
          //   arg.startStr < new Date(Date.now()).toStr
          // )
          const endDate = new Date(arg.endStr);
          endDate.setDate(endDate.getDate() - 1);
          const newDeadline = endDate.toISOString().split("T")[0];
          const currentTime = new Date(Date.now());
          // currentTime.setHours(currentTime.getHours());
          // currentTime.setMinutes(currentTime.getMinutes())
          changeHandler({
            startDate: newStartDate || `${arg.startStr}T${`${currentTime.getHours()}`.length == 1 ? `0${currentTime.getHours()}` : `${currentTime.getHours()}`}:${`${currentTime.getMinutes()}`.length == 1 ? `0${currentTime.getMinutes()}` : `${currentTime.getMinutes()}`}`,
            deadline: newEndDate || `${newDeadline}T23:59`,
          });

          const today = new Date(Date.now());
          if (new Date(arg.start) < today) {
            return toast.error("Date And Time Must Be Valid");
          } else {
            document.getElementById("add_todo_modal").showModal();
          }
        }}
        events={todos.map((element, index) => {
          const startDate = new Date(element.startDate);
          const endDate = new Date(element.deadline);
          startDate.setDate(startDate.getDate() + 1);
          endDate.setDate(endDate.getDate() + 1);
          // console.log(newStartDate.getDay())
          const newStartDate = startDate.toISOString().split("T")[0];
          const newDeadline = endDate.toISOString().split("T")[0];

          return {
            title: element.title,
            start: element.startDate,
            end: element.deadline,
            extendedProps: {
              description: element.description,
              tags: element.tags.split(" "),
              _id: element._id,
              startDate: element.startDate,
              deadline: element.deadline,
              sharedTo: element.sharedTo
            },
          };
        })}
        dateClick={(arg) => {
          console.log(new Date(arg.date).toLocaleTimeString());
          console.log(new Date(arg.date).toISOString());
          console.log(
            arg.dateStr < new Date(Date.now()).toISOString().split("T")[0]
          );

          let newStartDate;
          let newEndDate;

          console.log(arg.view.type);

          if (
            arg.view.type.startsWith("timeGridDay") ||
            arg.view.type.startsWith("timeGridWeek")
          ) {
            console.log("Day Grid");
            const tempStartDate = new Date(arg.date);
            // tempStartDate.setHours(tempStartDate.getHours() + 5);
            // tempStartDate.setMinutes(tempStartDate.getMinutes() + 30);
            // newStartDate = tempStartDate
            //   .toISOString()
            //   .split(".")[0]
            //   .slice(0, 16);
            // console.log(newStartDate);
            // const tempEndDate = new Date(arg.date);
            // tempEndDate.setHours(tempEndDate.getHours() + 5);
            // tempEndDate.setMinutes(tempEndDate.getMinutes() + 30 + 30);
            // newEndDate = tempEndDate.toISOString().split(".")[0].slice(0, 16);
            // console.log(newEndDate);

            newStartDate = `${`${tempStartDate.getFullYear()}`}-${`${tempStartDate.getMonth() + 1}`.padStart(2, "0")}-${`${tempStartDate.getDate()}`.padStart(2, "0")}T${`${tempStartDate.getHours()}`.padStart(2, "0")}:${`${tempStartDate.getMinutes()}`.padStart(2, "0")}`
            tempStartDate.setMinutes(tempStartDate.getMinutes() + 30)
            newEndDate = `${`${tempStartDate.getFullYear()}`}-${`${tempStartDate.getMonth() + 1}`.padStart(2, "0")}-${`${tempStartDate.getDate()}`.padStart(2, "0")}T${`${tempStartDate.getHours()}`.padStart(2, "0")}:${`${tempStartDate.getMinutes()}`.padStart(2, "0")}`

            console.log("New Start Date: ", newStartDate)
            console.log("New End Date: ", newEndDate)

            console.log("Temp Start Date: ", tempStartDate)
          }

          resetDetails(false);
          const currentTime = new Date(Date.now());

          changeHandler({
            startDate: newStartDate || `${arg.dateStr}T${`${currentTime.getHours()}`.length == 1 ? `0${currentTime.getHours()}` : `${currentTime.getHours()}`}:${`${currentTime.getMinutes()}`.length == 1 ? `0${currentTime.getMinutes()}` : `${currentTime.getMinutes()}`}`,
            deadline: newEndDate || `${arg.dateStr}T23:59`,
          });
          const todayStr = new Date(Date.now());
          // console.log(arg.date < todayStr)
          console.log(
            new Date(arg.dateStr).toISOString().split("T")[0],
            todayStr.toISOString().split("T")[0]
          );
          // console.log(new Date(arg.date).toTimeString() < todayStr.toTimeString())
          // console.log(new Date(arg.date).toISOString().split(".")[0] , todayStr.toISOString().split(".")[0])
          console.log(new Date(arg.date).toTimeString() > todayStr.toTimeString())
          if (
            (new Date(arg.dateStr).toISOString().split("T")[0] >
            todayStr.toISOString().split("T")[0])
          ) {
            // toast.error("Dates Must Be Valid");
            document.getElementById("add_todo_modal").showModal();
          } 
          
          else if(!arg.view.type.startsWith("dayGridMonth") && (new Date(arg.dateStr).toISOString().split("T")[0] ==
            todayStr.toISOString().split("T")[0] && new Date(arg.date).toTimeString() > todayStr.toTimeString())){
              document.getElementById("add_todo_modal").showModal();
            }
          else if(arg.view.type.startsWith("dayGridMonth") && (new Date(arg.dateStr).toISOString().split("T")[0] ==
            todayStr.toISOString().split("T")[0])){
              document.getElementById("add_todo_modal").showModal();
            }

          else {
            toast.error("Date and Time Must Be Valid")
            return;
          }
        }}
        eventDrop={(clickInfo) => {
          const event = clickInfo.event;
          console.log("Shared To: ", event.extendedProps.sharedTo)
          const view = calendarRef.current.getApi().view.type;
          console.log(
            new Date(event.start).toISOString().split(".")[0].slice(0, 16),
            new Date(event.end).toISOString().split(".")[0].slice(0, 16),
            event.startStr,
            event.endStr,
            new Date(Date.now()).toISOString().split("T")[0]
          );
          console.log(
            event.startStr < new Date(Date.now()).toISOString().split("T")[0] ||
              event.endStr < new Date(Date.now()).toISOString().split("T")[0]
          );

          let newStartDate;
          let newDeadline;

          if (
            view.startsWith("timeGridDay") ||
            view.startsWith("timeGridWeek")
          ) {
            const tempStartDate = new Date(event.start);
            // tempStartDate.setHours(tempStartDate.getHours() + 5);
            // tempStartDate.setMinutes(tempStartDate.getMinutes() + 30);
            // newStartDate = tempStartDate
            //   .toISOString()
            //   .split(".")[0]
            //   .slice(0, 16);
            newStartDate = `${tempStartDate.getFullYear()}-${`${tempStartDate.getMonth() + 1}`.padStart(2, "0")}-${`${tempStartDate.getDate()}`}T${tempStartDate.getHours()}:${tempStartDate.getMinutes()}`
            const tempDeadline = new Date(event.end);
            // tempDeadline.setHours(tempDeadline.getHours() + 5);
            // tempDeadline.setMinutes(tempDeadline.getMinutes() + 30);
            // newDeadline = tempDeadline.toISOString().split(".")[0].slice(0, 16);
            newDeadline = `${tempDeadline.getFullYear()}-${`${tempDeadline.getMonth() + 1}`.padStart(2, "0")}-${`${tempDeadline.getDate()}`}T${tempDeadline.getHours()}:${tempDeadline.getMinutes()}`
          }
          console.log(newStartDate, newDeadline);
          if (
            event.startStr < new Date(Date.now()).toISOString().split("T")[0] ||
            event.endStr < new Date(Date.now()).toISOString().split("T")[0]
          ) {
            toast.error("Dates Must Be Valid");
            return;
          }
          const endDate = new Date(event.endStr);
          endDate.setDate(endDate.getDate() - 1);
          const newEndDate = endDate.toISOString().split("T")[0];
          setDetails({
            title: event.title,
            description: event.extendedProps.description,
            tags: event.extendedProps.tags,
            deadline: newDeadline || `${event.endStr.split("T")[0]}T23:59`,
            startDate: newStartDate || `${event.startStr.split("T")[0]}T00:00`,
            _id: event.extendedProps._id,
          });
          if(event.extendedProps.sharedTo.includes(user.user.email)) return toast.error("You Cannot Edit ToDo Shared To You")
          document.getElementById("add_todo_modal").showModal();
        }}
      />
    </div>
  );
}
