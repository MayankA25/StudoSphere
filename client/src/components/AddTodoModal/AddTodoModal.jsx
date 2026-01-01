import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTodoStore } from "../../store/useTodoStore";
import { useCalendarStore } from "../../store/useCalendarStore";
import { getFormattedDate } from "../../lib/formatDate";

export default function AddTodoModal() {
//   const [number, setNumber] = useState(4);
//   const [tags, setTags] = useState(["A", "B", "ABC", "ABCD"]);
const {details, details: { tags }, setTags, updateTags, number, setNumber, addTodo, changeHandler, edit, editTodo } = useTodoStore();
const { endDate } = useCalendarStore();

// const [startDate, setStartDate] = useState("");

const getStartDate = ()=>{
  // const startDate = new Date(Date.now())
  // startDate.setHours(startDate.getHours() + 5)
  //   startDate.setMinutes(startDate.getMinutes() + 30)
  //   console.log("Here: ", startDate.toISOString().split(".")[0].slice(0,16));
  //   return startDate.toISOString().split(".")[0].slice(0,16);

  const now = new Date();

  const formattedDate = getFormattedDate(now)

  return formattedDate;
}

  return (
    <dialog
      id={`add_todo_modal`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{edit ? "Edit Todo": "Add Todo"}</h3>
        <div className="py-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-bold text-md">Title</h1>
            <input required type="text" className="input input-primary w-full" value={details.title} placeholder="Enter Title Here" onChange={(e)=>{ changeHandler({ title: e.target.value }) }} />
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-bold text-md">Description</h1>
            <input required type="text" className="input input-primary w-full" placeholder="Enter Description Here" value={details.description} onChange={(e)=>{ changeHandler( { description: e.target.value } ) }} />
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-bold text-md">Start Date</h1>
            <input required type="datetime-local" id="startDateVal" className="input input-primary w-full" placeholder="Select StartDate" value={details.startDate|| getStartDate()} onChange={(e)=>{ changeHandler( { startDate: e.target.value} ) }} />
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-bold text-md">Deadline</h1>
            <input required type="datetime-local" className="input input-primary w-full" placeholder="Select Deadline" value={details.deadline || endDate || ""} onChange={(e)=>{ changeHandler( { deadline: e.target.value} ) }} />
          </div>
          <div className="flex flex-col gap-3 5">
            <h1 className="font-bold">Tags</h1>
            {[...Array(number)].map((element, index) => {
              return (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    className="input input-primary"
                    onChange={(e) => {
                      updateTags(index, e.target.value)
                    }}
                    placeholder={`Enter Tag ${index+1}`}
                    value={tags.length-1 >= index ? tags[index] : ""}
                  />
                  {number - 1 === index ? (
                    <div
                      className="flex bg-base-200 p-2.5 rounded-lg items-center gap-1 cursor-pointer"
                      onClick={() => {tags[index] && setNumber(number + 1)}}
                    >
                      <Plus />
                      <p>Add Tag</p>
                    </div>
                  ) : (
                    <div
                      className="flex p-1 bg-base-300 hover:bg-error rounded-md"
                      onClick={() => {
                        const newTags = tags.filter((tag, tagIndex) => {
                          return index!==tagIndex
                        });
                        // console.log("New Tags:", newTags)
                        setTags(newTags);
                        setNumber(number - 1);
                      }}
                    >
                      {" "}
                      <X className="size-4.5" />{" "}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary" onClick={()=>{edit? editTodo() : addTodo(document.getElementById("startDateVal").value)}} >{edit ? "Edit Todo": "Add Todo"}</button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
