import { Bot, Box, ChartNoAxesCombined, Contact, Globe, ListCheck, Mail, Menu, MessageSquare } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavStore } from "../../store/useNavStore";
import { useChatStore } from "../../store/useChatStore";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore";

function Sidebar() {
  const { user } = useAuthStore();
  const { filterMessages } = useChatStore();
  const { setPath } = useNavStore();
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [option, setOption] = useState(null);

  const path = useNavStore();

  const icons = [<MessageSquare />, <Box />, <ListCheck />, <Bot />, <Contact />, <ChartNoAxesCombined />];
  const texts = ["Forums", "Faculty Cabins", "ToDo List", "ChatBot", "Jobs", "Job Analytics"];
  const paths = ["/forums", "/faculty-cabins", "/todo", "/chatbot", "/jobs", "/job-analytics"];
  const options = ["General", "Lost and Found", "Campus Life", "Career"];

  // useEffect(()=>{
  //   setShow(true)
  // }, [])

  return (
    <>
      <span className="p-2 fixed top-13 z-800 bg-base-200 right-0 rounded-md md:hidden">
        <Menu
          className="md:hidden size-6"
          onClick={() => {
            show ? setShow(false) : setShow(true);
          }}
        />
      </span>
      <div
        className={`flex-col bg-base-200 h-screen md:p-4 border-r border-base-300  md:bg-neutral-800/15 ${
          show ? "w-[100%] fixed" : "w-[0%]"
        } absolute transition-all duration-300 md:w-[25%] border-r-2 border-black md:flex md:sticky md:top-0 overflow-hidden md:pt-18 pt-12 bg-gradient-to-br from-0% to-slate-900 z-700`}
      >
        <div className="flex flex-col md:fixed md:top-18 md:w-[25%] w-[100%]">
          <div className="flex flex-col justify-between gap-6 ">
            <div className="flex justify-center items-center p-4 gap-3 mb-8">
              <Globe />
              <h1 className="text-base-content font-bold text-xl hover:tracking-widest transition-all duration-300">
                StudoSphere
              </h1>
            </div>
            <ul className="flex flex-col">
              {[...Array(6)].map((element, index) => {
                if(texts[index] == "Job Analytics" && !user.user.isHead)return null
                return texts[index] === "Forums" && user.user.isHead ? (
                  <ul key={index}>
                    <div
                      onClick={() => {
                        setPath("/mailer");
                        setSelected(index);
                        setShow(false);
                      }}
                      key={index}
                      className={`flex items-center gap-3 p-3 w-[86.5%] rounded-lg cursor-pointer transition-all ${
                        index === selected
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-300 text-base-content"
                      }`}
                    >
                      <div className="flex justify-start gap-3 items-center hover:scale-105 transition-all">
                        <i><Mail/></i>
                        <h1 className="font-bold text-lg">Mailer</h1>
                      </div>
                    </div>
                  </ul>
                ) : (
                  <ul key={index}>
                    <div
                      onClick={() => {
                        setPath(paths[index]);
                        setSelected(index);
                        setShow(false);
                      }}
                      key={index}
                      className={`flex items-center gap-3 p-3 w-[90%] rounded-lg cursor-pointer transition-all ${
                        index === selected
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-300 text-base-content"
                      }`}
                    >
                      <div className="flex justify-start gap-3 items-center hover:scale-105 transition-all">
                        <i>{icons[index]}</i>
                        <h1 className="font-bold text-lg">{texts[index]}</h1>
                      </div>
                    </div>
                    {
                      <li
                        className={`flex flex-col overflow-y-hidden  ${
                          selected != 0 ? "h-0 " : "md:h-50"
                        }  transition-all duration-300 w-[85%] ${
                          index != 0 && "hidden"
                        }`}
                      >
                        {options.map((element, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                filterMessages(element);
                                setOption(element);
                                setShow(false);
                              }}
                              className={`px-15 font-bold text-lg ${
                                option == element
                                  ? "bg-primary/10"
                                  : "hover:bg-primary/20"
                              }  p-2 cursor-pointer rounded-md`}
                            >
                              <div className="flex justify-start gap-3 items-center hover:scale-105 transition-all w-full">
                                {index + 1}. {element}
                              </div>
                            </div>
                          );
                        })}
                      </li>
                    }
                  </ul>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
