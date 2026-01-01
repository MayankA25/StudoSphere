import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import Welcome from "../../components/Welcome/Welcome";
import Forums from "../../components/Forums/Forums";
import { useNavStore } from "../../store/useNavStore";
import FacultyDetails from "../../components/FacultyDetails/FacultyDetails";
import ToDo from "../../components/ToDo/ToDo";
import ChatBot from "../../components/ChatBot/ChatBot";
import Mailer from "../../components/Mailer/Mailer";
import Jobs from "../../components/Jobs/Jobs";
import JobAnalytics from "../../components/JobAnalytics/JobAnalytics";

function Dashboard() {
  const location = useLocation()
  const { path } = useNavStore();
  const comps = {
    "/mailer": <Mailer/>,
    "/": <Welcome/>,
    "/forums": <Forums/>,
    "/faculty-cabins": <FacultyDetails/>,
    "/todo": <ToDo/>,
    "/chatbot": <ChatBot/>,
    "/jobs" : <Jobs/> ,
    "/job-analytics": <JobAnalytics/>
  }
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex bg-base-200 w-[100vw] h-[100%] rounded-lg">
        <Sidebar />
        {comps[path]}
      </div>
    </div>
  );
}

export default Dashboard;
