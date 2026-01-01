import { Plus, X } from "lucide-react";
import React, { useEffect } from "react";
import { useTodoStore } from "../../store/useTodoStore";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

export default function ShareTodoModal({ modalNo, title, id }) {
  const { allUsers, getAllUsers, search } = useAuthStore();
  const {
    shareNumber,
    setShareNumber,
    names,
    updateName,
    setNames,
    shareTodo,
  } = useTodoStore();
  // console.log("Id: ", id);
  useEffect(() => {
    getAllUsers();
    search("");
  }, []);
  return (
    <dialog
      id={`share_todo_modal_${modalNo}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box flex flex-col gap-5">
        <h3 className="font-bold text-lg">Share ToDo:- {title} </h3>
        <div className="flex flex-col justify-center gap-4">
          {[...Array(shareNumber)].map((element, index) => {
            return (
              <div key={index} className=" gap-3 w-full">
                <div className="flex w-full gap-3">
                  <input
                    type="text"
                    id={`input_${index}`}
                    className="input input-primary w-[70%]"
                    placeholder="Add Name"
                    value={index < names.length ? names[index] : ""}
                    onChange={(e) => updateName(e.target.value, index)}
                  />
                  {shareNumber - 1 == index ? (
                    <div
                      className="flex items-center justify-center bg-base-300 rounded-md p-2"
                      onClick={() => {
                        names[index] &&
                          names[index].trim() !== "" &&
                          allUsers.findIndex(
                            (user) => user.email == names[index]
                          ) !== -1 &&
                          setShareNumber(shareNumber + 1);
                      }}
                    >
                      <Plus />
                      <p>Add Name</p>
                    </div>
                  ) : (
                    <div
                      className="bg-base-300 p-1 rounded-md hover:bg-error flex items-center justify-center"
                      onClick={() => {
                        const newNames = names.filter((_, nameIndex) => {
                          return nameIndex != index;
                        });
                        setNames(newNames);
                        setShareNumber(shareNumber - 1);
                      }}
                    >
                      <X className="size-4.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {allUsers.length !== 0 && (
            <div className="flex flex-col bg-base-200 gap-4 rounded-lg overflow-y-scroll h-[20vh]">
              {allUsers.map((user, index2) => {
                return (
                  <div
                    key={index2}
                    className="flex items-center gap-3 hover:bg-base-300 w-full p-3"
                    onClick={() => {
                      if(names.findIndex((name)=>name==user.email) == -1){

                        document.getElementById(`input_${shareNumber-1}`)
                        updateName(user.email, shareNumber - 1);
                      }else{
                        return toast.error("Duplicated Emails")
                      }
                    }}
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.profilePic}
                      alt=""
                    />
                    <h1>{user.email}</h1>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-3">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-primary"
              onClick={() => {
                shareTodo(id);
              }}
            >
              Share
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
