import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Forward,
  MoveRight,
  Plus,
  Share,
  Timer,
} from "lucide-react";
import React, { useEffect } from "react";
import { useTodoStore } from "../../store/useTodoStore";
import AddTodoModal from "../AddTodoModal/AddTodoModal";
import ShareTodoModal from "../ShareTodoModal/ShareTodoModal";
import { useAuthStore } from "../../store/useAuthStore";
import CalendarModal from "../CalendarModal/CalendarModal";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../lib/formatDate";
import DeleteTodoModal from "../DeleteTodoModal/DeleteTodoModal";

export default function ToDo() {
  const navigate = useNavigate();
  const {
    getTodos,
    todos,
    setDetails,
    resetDetails,
    markAsCompleted,
    markAsIncomplete,
    search,
    setShareTodoId,
    addToCalendar
  } = useTodoStore();
  const { user } = useAuthStore();
  useEffect(() => {
    getTodos();
    search("");
    // console.log(todos);
  }, []);
  return (
    <div className="flex flex-col gap-5 w-[100%] min-h-[93vh] md:w-[75%] overflow-y-scroll pb-4 md:pt-18 pt-12">
      <div className="flex items-center justify-between bg-base-300 relative">
        <h1 className="p-3 font-bold text-lg">ToDos</h1>
      </div>
      <div className="flex flex-col justify-center px-3 gap-9">
        <div className="flex flex-col items-center justify-between gap-5">
          <input
            type="text"
            className="input input-primary w-[90%]"
            placeholder="Search ToDos"
            onChange={(e) => search(e.target.value)}
          />
          <AddTodoModal />
          <div className="flex items-center justify-center gap-3">
            <div
              className="flex items-center justify-center md:gap-1.5 gap-0.5 bg-primary/10 px-2 py-2.5 rounded-lg h-full cursor-pointer"
              onClick={() => {
                resetDetails(false);
                document.getElementById("add_todo_modal").showModal();
              }}
            >
              <Plus className="font-bold size-3 md:size-4" />
              <h1 className="font-bold text-xs md:text-sm">Add ToDo</h1>
            </div>
            <CalendarModal />
            <div
              className="flex items-center justify-center gap-1.5 bg-primary/10 px-2 py-2.5 rounded-lg h-full cursor-pointer"
              onClick={() => {
                document.getElementById("my_calendar_modal").showModal();
              }}
            >
              <Timer className="font-bold size-4" />
              <h1 className="font-bold text-xs md:text-sm">Time Slots</h1>
            </div>
            <div
              className="flex items-center justify-center gap-1.5 bg-primary/10 px-2 py-2.5 rounded-lg h-full cursor-pointer"
              onClick={() => navigate("/fullcalendar")}
            >
              <Calendar className="font-bold size-4" />
              <h1 className="font-bold text-xs md:text-sm">Calendar</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7 justify-center">
          <h1 className="font-bold text-2xl md:text-3xl">Your ToDos</h1>
          <div className="flex flex-col justify-center gap-4 mb-8">
            <h2 className="font-bold text-lg md:text-xl">Pending ToDos</h2>
            {todos.filter((element, index) => !element.completed).length !==
            0 ? (
              todos
                .filter((element) => !element.completed)
                .map((element, index) => {
                  // console.log(element);
                  return (
                    <div
                      key={index}
                      className="collapse bg-base-100 border border-base-300"
                    >
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-semibold flex justify-between items-center">
                        <ShareTodoModal
                          modalNo={index}
                          title={element.title}
                          id={element._id}
                        />
                        <DeleteTodoModal index={index} title={element.title}
                        id={element._id}/>
                        <div className="flex justify-between items-center w-full relative">
                          <div
                            className={`h-[4px] bg-white absolute top-[50%] ${
                              !element.completed ? "w-[0%]" : "w-[100%] "
                            } transition-all duration-300`}
                          ></div>
                          <h1 className="font-bold text-lg">{element.title}</h1>
                          <h1 className="font-semibold flex gap-2">
                            <span className="font-bold">
                              {new Date(element.startDate).toDateString()}{" "}
                            </span>{" "}
                            <MoveRight />
                            {new Date(element.deadline).toDateString()}{" "}
                            {new Date(element.deadline).toLocaleTimeString()}
                          </h1>
                          {!element?.sharedTo?.includes(user.user.email) ? (
                            <div
                              className="flex bg-base-200 p-1 rounded-md cursor-pointer z-200"
                              onClick={() => {
                                document
                                  .getElementById(`share_todo_modal_${index}`)
                                  .showModal();
                                setShareTodoId(element._id);
                              }}
                            >
                              <Forward />
                            </div>
                          ) : (
                            <div className="flex justify-center items-center gap-1">
                              <span className="font-bold">Shared By: </span>{" "}
                              {element.sharedBy}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="collapse-content text-sm flex flex-col gap-4">
                        <ul className="flex-col flex px-3 gap-2">
                          <li className="list-disc">
                            <span className="font-bold">Description: </span>{" "}
                            {element.description}
                          </li>
                          <li className="list-disc">
                            <span className="font-bold">Start Date: </span>{" "}
                            {new Date(element.startDate).toDateString()},{" "}
                            {new Date(element.startDate).toLocaleTimeString()}
                          </li>
                          <li className="list-disc">
                            <span className="font-bold">Deadline: </span>{" "}
                            {new Date(element.deadline).toDateString()},{" "}
                            {new Date(element.deadline).toLocaleTimeString()}
                          </li>
                          {element?.sharedTo?.length != 0 && (
                            <li className="list-disc">
                              <span className="font-bold">
                                {element?.sharedTo?.findIndex(
                                  (email) => email == user.user.email
                                ) != -1
                                  ? "Assigned By: "
                                  : "Shared To"}{" "}
                              </span>
                              {element?.sharedTo?.findIndex(
                                (email) => email == user.user.email
                              ) != -1
                                ? element.sharedBy
                                : element.sharedTo.join(",")}
                            </li>
                          )}
                        </ul>
                        <div className="flex flex-row gap-2 flex-wrap">
                          {element.tags.length !== 0 &&
                            element.tags.split(" ").map((tag, index) => {
                              return (
                                <span
                                  key={index}
                                  className="bg-neutral font-semibold text-neutral-content px-3 rounded-full py-1"
                                >
                                  {tag}
                                </span>
                              );
                            })}
                        </div>
                        <div className="flex flex-col gap-3 font-bold">
                          {(element?.sharedBy == user.user.email ||
                            element?.sharedBy?.length === 0) && (
                            <button
                              className="btn"
                              onClick={() => {
                                // console.log("Deadline: ", element.deadline)
                                setDetails({
                                  title: element.title,
                                  description: element.description,
                                  tags: element.tags.split(" "),
                                  startDate:  formatDateTime(element.startDate),
                                  deadline:  formatDateTime(element.deadline),
                                  _id: element._id,
                                });
                                document
                                  .getElementById("add_todo_modal")
                                  .showModal();
                              }}
                            >
                              Edit
                            </button>
                          )}
                          <button
                            className="btn btn-primary font-bold"
                            onClick={() => {
                              element.completed
                                ? markAsIncomplete(element._id)
                                : markAsCompleted(element._id);
                            }}
                          >
                            {element.completed
                              ? "Mark As Uncompleted"
                              : "Mark As Completed"}
                          </button>
                          {(element?.sharedBy == user.user.email ||
                            element?.sharedBy?.length === 0) && (
                            <button
                              className="btn btn-error text-white font-bold"
                              onClick={() => document.getElementById(`my_todo_delete_modal_${index}`).showModal()}
                            >
                              {" "}
                              Delete
                            </button>
                          )}
                          {(element?.sharedBy == user.user.email ||
                            element?.sharedBy?.length === 0) && (
                            <button
                              className="btn btn-primary text-primary-content font-bold"
                              onClick={() => addToCalendar(element._id)}
                            >
                              {" "}
                              Add To My Google Calendar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="flex items-center justify-center font-bold text-sm md:text-lg">
                {" "}
                No Pending ToDos{" "}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center gap-4">
            <h2 className="font-bold text-lg md:text-xl">Completed ToDos</h2>
            {todos.filter((element, index) => element.completed).length !==
            0 ? (
              todos
                .filter((element) => element.completed)
                .map((element, index) => {
                  // console.log(element);
                  return (
                    <div
                      key={index}
                      className="collapse bg-base-100 border border-base-300"
                    >
                      <ShareTodoModal
                        modalNo={index}
                        title={element.title}
                        id={element._id}
                      />
                      <DeleteTodoModal index={index} title={element.title}
                        id={element._id}/>
                      <input type="radio" name="my-accordion-2" />
                      <div className="collapse-title font-semibold flex justify-between items-center">
                        <div className="flex justify-between items-center w-full relative">
                          <div
                            className={`h-[4px] bg-neutral absolute top-[50%] ${
                              !element.completed ? "w-[0%]" : "w-[100%]"
                            } transition-all duration-300 `}
                          ></div>
                          <h1 className="font-bold text-lg">{element.title}</h1>
                          <h1 className="font-semibold hidden lg:block">
                            <span className="font-bold">Deadline: </span>{" "}
                            {new Date(element.deadline).toDateString()}{" "}
                          </h1>
                          {!element?.sharedTo?.includes(user.user.email) ? (
                            <div
                              className="flex bg-base-200 p-1 rounded-md cursor-pointer z-100"
                              onClick={() => {
                                document
                                  .getElementById(`share_todo_modal_${index}`)
                                  .showModal();
                                setShareTodoId(element._id);
                              }}
                            >
                              <Forward />
                            </div>
                          ) : (
                            <div className="flex justify-center items-center gap-1">
                              <span className="font-bold">Shared By: </span>{" "}
                              {element.sharedBy}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="collapse-content text-sm flex flex-col gap-4">
                        <ul className="flex-col flex px-3 gap-2">
                          <li className="list-disc">
                            <span className="font-bold">Description: </span>{" "}
                            {element.description}
                          </li>
                          <li className="list-disc">
                            <span className="font-bold">Deadline: </span>{" "}
                            {new Date(element.deadline).toDateString()}
                          </li>
                          {element?.sharedTo?.length != 0 && (
                            <li className="list-disc">
                              <span className="font-bold">
                                {element?.sharedTo?.findIndex(
                                  (email) => email == user.user.email
                                ) != -1
                                  ? "Assigned By: "
                                  : "Shared To"}{" "}
                              </span>
                              {element?.sharedTo?.findIndex(
                                (email) => email == user.user.email
                              ) != -1
                                ? element.sharedBy
                                : element.sharedTo.join(",")}
                            </li>
                          )}
                        </ul>
                        <div className="flex flex-row gap-2 flex-wrap">
                          {element.tags.length !== 0 &&
                            element.tags.split(" ").map((tag, index) => {
                              return (
                                <span
                                  key={index}
                                  className="bg-neutral font-semibold text-neutral-content px-3 rounded-full py-1"
                                >
                                  {tag}
                                </span>
                              );
                            })}
                        </div>
                        <div className="flex flex-col gap-3 font-bold">
                          {/* {(element?.sharedBy==user.user.email || element?.sharedBy?.length === 0) && (
                            <button
                              className="btn"
                              onClick={() => {
                                setDetails({
                                  title: element.title,
                                  description: element.description,
                                  tags: element.tags.split(" "),
                                  deadline: element.deadline,
                                  _id: element._id,
                                });
                                document
                                  .getElementById("add_todo_modal")
                                  .showModal();
                              }}
                            >
                              Edit
                            </button>
                          )} */}
                          <button
                            className="btn btn-primary font-bold"
                            onClick={() => {
                              element.completed
                                ? markAsIncomplete(element._id)
                                : markAsCompleted(element._id);
                            }}
                          >
                            {element.completed
                              ? "Mark As Incomplete"
                              : "Mark As Completed"}
                          </button>
                          {(element?.sharedBy == user.user.email ||
                            element?.sharedBy?.length === 0) && (
                            <button
                              className="btn btn-error text-error-content font-bold"
                              onClick={() => document.getElementById(`my_todo_delete_modal_${index}`).showModal()}
                            >
                              {" "}
                              Delete
                            </button>
                          )}
                          {(element?.sharedBy == user.user.email ||
                            element?.sharedBy?.length === 0) && (
                            <button
                              className="btn btn-error text-error-content font-bold"
                              onClick={() => document.getElementById(`my_todo_delete_modal_${index}`).showModal()}
                            >
                              {" "}
                              Add To My Google Calendar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="flex items-center justify-center font-bold text-sm md:text-lg">
                {" "}
                No Completed ToDos{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
