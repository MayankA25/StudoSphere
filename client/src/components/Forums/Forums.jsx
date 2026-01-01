import {
  Edit,
  Ellipsis,
  Image,
  LucideDelete,
  Paperclip,
  Send,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import EditModal from "../EditModal/EditModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import toast from "react-hot-toast";
import RepliesModal from "../RepliesModal/RepliesModal";
import { uploadAttachments } from "../../utils/uploadFile";



function Forums() {
  const ref = useRef();
  const ref2 = useRef(null);
  const ref3 = useRef();

  const { user } = useAuthStore();
  const [imageURL, setImageURL] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [hover, setHover] = useState(null);
  const {
    getMessages,
    messages,
    sendMessage,
    sending,
    subscribeToMessages,
    unsubscribeToMessages,
    input,
  } = useChatStore();

  const handleScroll = (e) => {
  // console.log(document.getElementById("box").getBoundingClientRect());
  const box = document.getElementById("box").getBoundingClientRect();
  const messages = document.getElementsByClassName("message");
  const newMessages = [];
  for (const message of messages) {
    if (
      message.getBoundingClientRect().x >= box.x &&
      message.getBoundingClientRect().y < box.bottom - 93 &&
      message.getBoundingClientRect().y >= box.y
    ) {
      // console.log(message);
      newMessages.push(message);
    }
  }
  // console.log(newMessages);
  const date = new Date(newMessages[0]?.innerText).toDateString();
  const yesterday = new Date(Date.now());
  yesterday.setDate(yesterday.getDate() - 1);
  // console.log(yesterday.toDateString(), date);
  if (date == new Date(Date.now()).toDateString()) {
    document.getElementById("time").innerText = "Today";
  }
  if (yesterday.toDateString() == date) {
    document.getElementById("time").innerText = "Yesterday";
  } else if (
    date != new Date(Date.now()).toDateString() &&
    yesterday.toDateString() != date
  ) {
    document.getElementById("time").innerText = date;
  }
};

  useEffect(() => {
    getMessages();
    subscribeToMessages();

    return () => {
      unsubscribeToMessages();
    };
  }, []);
  useEffect(() => {
    // console.log(ref2.current);
    ref2.current.scrollIntoView({ behaviour: "smooth" });
    messages.length >= 1 && handleScroll();
  }, [messages]);

  const updateImageURL = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return console.log("No File Selected");
    }
    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   const result = e.target.result;
    //   setImageURL(result);
    //   console.log(result);
    // };
    // reader.readAsDataURL(file);
    toast.promise(async()=>{

      const formData = new FormData();
      formData.append("files", file);
      const urls = await uploadAttachments(formData)
      // console.log(urls[0])
      setImageURL(urls[0])
    }, {
      loading: "Uploading...",
      error: "Cannot Upload Image"
    })
  };

  return (
    <div className="flex flex-col w-[100%] md:w-[75%] h-[92vh] pt-18">
      <div
        className="overflow-y-auto overflow-x-hidden flex flex-col items-center"
        id="box"
        onScroll={messages.length >= 1 ? handleScroll : ()=>{}}
      >
        {messages.length >= 1 && (
          <div
          className="fixed top-30 bg-neutral p-2 rounded-full px-3 font-bold bg-gradient-to-br from-0% to-slate-800 gap-3 mb- z-500"
          id="time"
          ></div>
        )}
        <div className="flex flex-col px-5 py-12 min-h-[85vh] w-[95%] md:w-[85%] m-auto">
          {messages.map((element, index) => {
            const foundIndex = messages.findIndex(
              (element) =>
                new Date(Date.now()).toDateString() ==
              new Date(element?.createdAt).toDateString()
            );
            return (
              <div key={index}>
                <RepliesModal index={index} message={element}/>
                {new Date(element?.createdAt).toDateString() ==
                  new Date(Date.now()).toDateString() &&
                  index == foundIndex && (
                    <div className="m-auto bg-base-300 text-center w-17  rounded-full p-2 px-3 font-bold sticky mb-4">
                      Today
                    </div>
                  )}
                <div
                  key={index}
                  ref={ref3}
                  className={`flex flex-col my-1 ${
                    user.user._id == element.senderId
                      ? "chat-end"
                      : "chat-start"
                  } my-2 font-semibold`}
                  onMouseOver={() => {
                    setHover(index);
                  }}
                  onMouseOut={() => {
                    setHover(null);
                  }}
                >
                  <div className="chat-header">
                    {/* Name */}
                    {user.user._id == element.senderId
                      ? "Me"
                      : element.senderName}
                    <time className="text-xs opacity-50 message">
                      {/* Time Of Message */}
                      {new Date(element.createdAt).toDateString()},{" "}
                      {new Date(element.createdAt).toLocaleTimeString()}
                    </time>
                    <input
                      className="text-xs opacity-50 hidden"
                      readOnly
                      value={new Date(element.createdAt).toDateString()}
                    ></input>
                  </div>
                  {element.image && (
                    <div
                      className={`flex items-center gap-2 ${
                        user.user._id == element.senderId && "flex-row-reverse "
                      }`}
                      onMouseOver={() => setHover(index)}
                      onMouseOut={() => setHover(null)}
                    >
                      {!element.text && (
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            {
                              <div
                                style={{
                                  backgroundImage: `url(${element.senderProfilePic})`,
                                  // objectFit: "fill"
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                }}
                                onError={(e) => console.log(e)}
                              />
                            }
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-center relative w-50 rounded-4xl h-50 p-1 bg-neutral">
                        <img
                          src={element.image}
                          className="w-40 h-40 rounded-lg object-contain"
                        />
                      </div>
                      <DeleteModal
                        text={""}
                        modalNo={index}
                        messageId={element._id}
                      />
                      {hover == index && !element.text && (
                        <div
                          className={`dropdown ${index != 0 && "dropdown-top"}`}
                        >
                          <div tabIndex={0} role="button" className="">
                            <Ellipsis className="size-4 cursor-pointer" />
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm gap-4"
                          >
                            {user.user._id == element.senderId && (
                              <li
                                className="flex"
                                onClick={() => {
                                  document
                                    .getElementById(`my_modal_del_${index}`)
                                    .showModal();
                                }}
                              >
                                <p className="font-bold">Delete</p>
                              </li>
                            )}
                            <li
                              className="flex"
                              onClick={() => {
                                navigator.clipboard.writeText(element.image);
                                toast.success("Image Copied!");
                              }}
                            >
                              <p className="font-bold">Copy</p>
                            </li>
                            <li className="flex" onClick={() => {document.getElementById(`my_reply_${index}_modal`).showModal()}}>
                              <p className="font-bold">Replies</p>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  {element.text && (
                    <div
                      className={`chat ${
                        user.user._id == element.senderId
                          ? "chat-end"
                          : "chat-start"
                      }`}
                    >
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          {
                            <div
                              style={{
                                backgroundImage: `url(${element.senderProfilePic})`,
                                // objectFit: "fill"
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                              onError={(e) => console.log(e)}
                            />
                          }
                        </div>
                      </div>
                      <div
                        className={`flex gap-3 ${
                          user.user._id == element.senderId
                            ? "flex-row"
                            : "flex-row-reverse"
                        }`}
                      >
                        {/* {console.log(element.text)} */}

                        <div className="flex items-center">
                          {hover == index && (
                            // <div
                            //   className={`flex flex-col items-center justify-center gap-2`}
                            // >
                            <>
                              <EditModal
                                text={element.text}
                                modalNo={index}
                                messageId={element._id}
                              />
                              <DeleteModal
                                text={element.text}
                                modalNo={index}
                                messageId={element._id}
                              />
                              {/* //   <Edit
                            //     className="size-4 text-secondary-content/60 hover:text-secondary-content/90"
                            //     onClick={() => {
                            //       document
                            //         .getElementById(`my_modal_${index}`)
                            //         .showModal();
                            //     }}
                            //   />
                            //   <Trash2
                            //     className="size-4 text-secondary-content/60 hover:text-error/90"
                            //     onClick={() =>
                            //       document
                            //         .getElementById(`my_modal_del_${index}`)
                            //         .showModal()
                            //     }
                            //   />
                            // </div> */}

                              <div></div>
                              
                              <div
                                className={`dropdown ${
                                  index != 0 && "dropdown-top"
                                }`}
                              >
                                <div tabIndex={0} role="button" className="">
                                  <Ellipsis className="size-4 cursor-pointer" />
                                </div>
                                <ul
                                  tabIndex={0}
                                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm gap-4"
                                >
                                  {user.user._id == element.senderId && (
                                    <li
                                      className="flex"
                                      onClick={() => {
                                        document
                                          .getElementById(`my_modal_${index}`)
                                          .showModal();
                                      }}
                                    >
                                      <p className="font-bold">Edit</p>
                                    </li>
                                  )}
                                  {user.user._id == element.senderId && (
                                    <li
                                      className="flex"
                                      onClick={() => {
                                        document
                                          .getElementById(
                                            `my_modal_del_${index}`
                                          )
                                          .showModal();
                                      }}
                                    >
                                      <p className="font-bold">Delete</p>
                                    </li>
                                  )}
                                  <li
                                    className="flex"
                                    onClick={(e) => {
                                      navigator.clipboard.writeText(
                                        element.text
                                      );
                                      toast.success("Text Copied!");
                                    }}
                                  >
                                    <p className="font-bold">Copy</p>
                                  </li>
                                  <li className="flex" onClick={() => {document.getElementById(`my_reply_${index}_modal`).showModal()}}>
                                    <p className="font-bold">Replies</p>
                                  </li>
                                </ul>
                              </div>
                            </>
                          )}
                        </div>
                        <div
                          className={` p-3 chat-bubble-neutral rounded-lg items-center min-w-40 ${
                            user.user._id == element.senderId &&
                            "chat-bubble-primary"
                          }`}
                        >
                          {/* Message */}
                          {element.text}
                        </div>
                      </div>
                      <div className="chat-footer opacity-50">
                        {/* Status of message */}
                        {element.senderId === user.user._id &&
                          (sending && index === messages.length - 1
                            ? "Categorizing..."
                            : "Sent")}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={ref2}></div>
        </div>
      </div>
      <div className="flex items-center sticky bottom-0 left-0 w-full rounded-r-sm bg-transparent">
        <div className="flex flex-col justify-center w-full gap-1">
          {imageURL && (
            <div className="flex items-center justify-center relative w-50 rounded-4xl h-50 p-1 bg-neutral">
              <img
                src={imageURL}
                className="w-40 h-40 rounded-lg object-contain"
              />
              <div
                className="flex justify-center items-center absolute -right-1 -top-1 cursor-pointer bg-neutral rounded-full p-0.5"
                onClick={() => setImageURL("")}
              >
                <X />
              </div>
            </div>
          )}

          {input && (
            <form
              onSubmit={(e) => {
                
                e.preventDefault();
                setTextMessage("");
                setImageURL("");
              }}
              className={`flex justify-around rounded-md md:w-[75%] w-full gap-2.5 md:gap-8 bg-base-300 py-3 px-7 fixed right-0 bottom-0 ${
                !user?.user._id && messages.length == 0 ? "hidden" : "flex"
              }`}
            >
              <div className="flex flex-col gap-3 w-full">
                <input
                  type="text"
                  className="p-1.5 border px-3 w-full rounded-md input input-bordered bg-base-200 border-base-300 focus:border-primary"
                  placeholder="Enter Message Here"
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <Paperclip
                  className="size-12 btn btn-ghost btn-sm"
                  onClick={() => ref.current.click()}
                />
                <input
                  ref={ref}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={updateImageURL}
                />
              </div>
              <button
                className="flex items-center justify-center cursor-pointer p-2 rounded-lg bg-primary hover:bg-primary/90 size-10 btn btn-ghost btn-sm"
                // disabled={sending}
                onClick={() => {
                  sendMessage({ text: textMessage, image: imageURL });
                }}
              >
                <Send className="text-primary-content" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forums;
