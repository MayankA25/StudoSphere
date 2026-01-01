import { Send, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function RepliesModal({ index, message }) {
  const { addReply, deleteReply, messages } = useChatStore();
  const { user } = useAuthStore();
  const [reply, setReply] = useState("");
  const ref = useRef(null)
  useEffect(()=>{
    ref.current.scrollIntoView()
  }, [messages])
  return (
    <dialog id={`my_reply_${index}_modal`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Replying To: </h3>
        <div className="flex flex-col my-4 ">
          <div className="flex flex-col justify-center bg-base-300 px-3 py-4 rounded-lg gap-2">
            {message.image && <img className="w-20 rounded-lg" src={message.image} alt="" />}
            {message.text && <p className="text-lg">{message.text}</p>}
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold mr-2 opacity-60">By:</p>
              <img
                src={message.senderProfilePic}
                className="w-5 rounded-full opacity-60"
                alt=""
              />
              <h1 className="text-sm font-semibold opacity-60">
                {message.senderName}
              </h1>
            </div>
          </div>
          <div className="my-3 flex flex-col text-lg mt-7">
            <h1>Replies({message.replies.length}): </h1>
            <div className="flex flex-col my-3 gap-2 min-h-0 max-h-60 overflow-y-scroll">
              {message.replies.map((element, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-2 bg-base-200 p-2 py-3 rounded-lg"
                  >
                    <div className="flex justify-between">
                      <p className="font-semibold text-sm">{element.reply}</p>
                      <p className="opacity-50 text-xs">{element.time}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <p className="text-sm font-normal mr-2 opacity-60">
                          By:
                        </p>
                        <img
                          src={element.profilePic}
                          className="w-4 rounded-full mr-0.5 opacity-60"
                          alt=""
                        />
                        <h1 className="text-xs font-normal opacity-60">
                          {element.username}
                        </h1>
                      </div>
                      {user.user.email == element.email && <button className="btn btn-xs flex hover:btn-error hover:text-white text-error" onClick={()=>deleteReply(message._id, index)}><Trash2 className="size-4"/> <p className="text-xs">Delete</p></button>}
                    </div>
                  </div>
                );
              })}
            <div ref={ref}></div>
            </div>
          </div>
          <form
            className="flex items-center gap-2 w-full my-3"
            onSubmit={(e) => {
              e.preventDefault();
              addReply(message._id, {
                ...user.user,
                reply,
                time: `${new Date(Date.now()).toDateString()}`,
              });
              setReply("")
            }}
          >
            <input
              type="text"
              className="input input-primary w-full"
              placeholder="Type Your Reply Here"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button className="flex items-center justify-center bg-primary p-2.25 rounded-lg">
              <Send className="size-5" />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
