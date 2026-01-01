import React, { useEffect } from "react";
import { useCalendarStore } from "../../store/useCalendarStore";
import AddTodoModal from "../AddTodoModal/AddTodoModal";
import { useTodoStore } from "../../store/useTodoStore";
import toast from "react-hot-toast";

export default function CalendarModal() {
  const { getWeekInfo, dates, weekDays } = useCalendarStore();
  const { setDeadline, setEdit } = useTodoStore();
  useEffect(() => {
    getWeekInfo();
  }, []);
  return (
    <dialog id="my_calendar_modal" className="modal">
      <div className="modal-box w-11/12 max-w-7xl h-[80%] ">
        <h3 className="font-bold text-lg mb-6">Calendar</h3>
        <div className="grid grid-cols-7 sticky -top-6 z-50 bg-base-300 rounded-2xl p-3">
          {dates.map((date, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col p-1 border-2 border-base-300 ${
                  new Date(Date.now()).getDate() == new Date(date).getDate() &&
                  "border-r-0 border-l-0 border-b-0 border-primary"
                } `}
              >
                <div
                  className={`font-bold ${
                    new Date(Date.now()).getDate() == new Date(date).getDate() && "text-primary"
                  } text-xs md:text-3xl`}
                >
                  {new Date(date).getDate()}
                </div>
                <div
                  className={`font-bold ${
                    new Date(Date.now()).getDate() == new Date(date).getDate() && "text-primary"
                  } text-lg`}
                >
                  {weekDays[index]}
                </div>
              </div>
            );
          })}
        </div>
        <div className=" border-2 border-black grid grid-cols-7 gap-0.5">
          <AddTodoModal />

          {dates.map((date, outIndex) => {
            return (
              <div
                key={outIndex}
                className="flex flex-col justify-center relative gap-0.5"
              >
                {[...Array(24)].map((_, inIndex) => {
                  return (
                    <div
                      key={inIndex}
                      className="flex flex-col justify-center text-xs"
                    >
                      {outIndex == 0 && (
                        <span className={`absolute -left-6.5  font-bold`}>
                          {inIndex}
                        </span>
                      )}
                      <input
                        className="py-6 px-4 border-2 border-base-300 cursor-pointer focus:outline-none focus:border-3 focus:border-primary hover:bg-neutral/20 text-center bg-primary font-bold text-primary-content text-lg rounded-xl mb-0.5"
                        readOnly
                        onClick={(e) => {
                          const dateTime = `${new Date(date).getFullYear()}-${`${new Date(date).getMonth()+1}`.padStart(2, "0")}-${`${new Date(date).getDate()}`.padStart(2, "0")}T${e.target.value}:00`
                          // console.log("Date Time: ", dateTime);
                          if(new Date(Date.now()).getTime() >= new Date(dateTime).getTime()) return toast.error("Invalid Deadline")
                          setEdit(false)
                          setDeadline(dateTime);
                          document.getElementById("add_todo_modal").showModal();
                        }}
                        value={`${`${inIndex}`.padStart(2, "0")}:00`}
                      ></input>
                      <input
                        className="py-5 px-4 border-2 border-base-300 cursor-pointer focus:outline-none focus:border-3 focus:border-primary hover:bg-neutral/20 text-center bg-primary text-primary-content font-bold text-lg rounded-xl"
                        readOnly
                        value={`${`${inIndex}`.padStart(2, "0")}:30`}
                        onClick={(e) => {
                          const dateTime = `${new Date(date).getFullYear()}-${`${new Date(date).getMonth()+1}`.padStart(2, "0")}-${`${new Date(date).getDate()}`.padStart(2, "0")}T${e.target.value}:00`

                          if(new Date(Date.now()).getTime() >= new Date(dateTime).getTime()) return toast.error("Invalid Deadline")
                          setEdit(false);
                          setDeadline(dateTime);
                          document.getElementById("add_todo_modal").showModal();
                        }}
                      ></input>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
