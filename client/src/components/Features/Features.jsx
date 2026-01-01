import {
  BookOpen,
  Box,
  Calendar,
  Cloud,
  Icon,
  Mail,
  NotebookPen,
  Rows4,
  Send,
  UserRound,
} from "lucide-react";
import React from "react";

function Features() {
  const texts = [
    "Real-Time Student Forums with AI-Powered Categorization",
    "Collaborative To-Do Lists with Calendar Sync",
    "Time Slot Booking + FullCalendar Integration",
    "Placement-Focused Job Board",
    "Applicant Management Dashboard (Placement Head Only)",
    "Chatbot for Casual Interaction",
  ];
  const info = [
    "Real-time chat auto-sorted by topic.",
    "Share Your Todos Among Your Friends.",
    "Pick slots via a visual schedulers",
    "Apply for job with one click",
    "Shortlist, reject & notify via email",
    "Friendly AI for casual convos",
  ];

  const icons = [
    <BookOpen />,
    <Box />,
    <UserRound />,
    <Send />,
    <NotebookPen />,
    <Calendar />,
  ];
  return (
    <div className="flex-col flex gap-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {[...Array(6)].map((element, index) => {
          return (
            <div
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 animate-fade-in flex gap-3"
            >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {icons[index]}
                </div>
              <div className="flex flex-col">
                <h3 className="text-white font-inter font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {texts[index]}
                </h3>
              <p className="text-slate-300 font-inter text-sm leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                {info[index]}
              </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Features;
