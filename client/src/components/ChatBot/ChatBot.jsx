import React, { useEffect, useRef, useState } from "react";
import { useChatbotStore } from "../../store/useChatbotStore";
import Header from "../Header/Header";
import { useAuthStore } from "../../store/useAuthStore";
import { Copy, Send } from "lucide-react";
// import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";

export default function ChatBot() {
  const ref = useRef(null);
  const {
    sendPrompt,
    subscribeToChatbot,
    unsubscribeChatbot,
    message,
    getChat,
    prevChat,
    sending
  } = useChatbotStore();
  const { user } = useAuthStore();
  const [prompt, setPrompt] = useState("");
  const [scroll, setScroll] = useState(false);
  const [hover, setHover] = useState(null);
  const [hover2, setHover2] = useState(null);
  // getResponse();
  useEffect(() => {
    getChat();
    subscribeToChatbot();
    // ref.current.scrollIntoView({ behaviour: "smooth" })
    return () => {
      unsubscribeChatbot();
    };
  }, []);

  useEffect(() => {
    ref.current.scrollIntoView({ behaviour: "smooth" });
  }, [scroll, prevChat]);

  return (
    <div className="flex flex-col md:w-[75%] h-[93vh] w-[100%] overflow-y-scroll md:pt-18 pt-12">
      <Header heading={"Using a free API. If it crashes, just pretend it’s a feature 😎"} />
      <div className="flex flex-col px-3 py-4">
        {prevChat.length == 0 ? (
          <div className="font-bold flex justify-center items-center text-lg">
            Type Something To Start The Conversation
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {prevChat.map((element, index) => {
              // console.log(index);
              return (
                <div className="flex flex-col gap-10" key={index}>
                  <div className="flex items-center"></div>
                  <div className="chat chat-end relative py-3" onMouseOver={() => setHover(index)}
                      onMouseOut={()=>setHover(null)} >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src={user.user.profilePic}
                        />
                      </div>
                    </div>

                    <div className="chat-header">Me</div>
                    <div
                      className="chat-bubble  font-semibold"
                      
                      >
                      {hover == index && (
                        <Copy
                          className="size-4 cursor-pointer my-3 absolute -bottom-7 right-0 "
                          onClick={(e) => {
                            {
                              navigator.clipboard.writeText(element.prompt);
                              toast.success("Text Copied!");
                            }
                          }}
                        />
                      )}
                      {element.prompt}
                    </div>
                  </div>
                  <div className="chat chat-start relative py-4 " onMouseOver={()=>setHover2(index)} onMouseOut={()=>setHover2(null)}>
                    {hover2 == index && <Copy className="absolute -bottom-2 left-3 size-4 cursor-pointer" onClick={()=>{navigator.clipboard.writeText(element.response); toast.success("Text Copied!")}}/>}
                    <div className="bg-neutral p-3 rounded-lg text-neutral-content bg-gradient-to-br from-blue-900 to-purple-900 gap-3 mb-" onMouseOver={()=>{setHover(index)}}>
                      <Markdown remarkplugins={[remarkGfm]}>
                        {element.response}
                      </Markdown>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div ref={ref}></div>
        {!sending && <form
          onSubmit={(e) => {
            e.preventDefault();
            sendPrompt(prompt);
            setPrompt("");
            scroll ? setScroll(false) : setScroll(true);
          }}
          className={`flex justify-between rounded-md md:w-[75%] w-full gap-2.5 md:gap-8 bg-base-300 p-3 fixed right-0 bottom-0 ${
            !user?.user._id ? "hidden" : "flex"
          }`}
        >
          <div className="flex flex-col gap-3 w-full ">
            <input
              type="text"
              className="p-1.5 border px-3 w-full rounded-md input input-bordered bg-base-200 border-base-300 focus:border-primary"
              placeholder="Enter Message Here"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
          </div>
          <button className="flex items-center justify-center cursor-pointer p-2 rounded-lg bg-primary hover:bg-primary/90">
            <Send className="text-primary-content" />
          </button>
        </form>}
      </div>
    </div>
  );
}
