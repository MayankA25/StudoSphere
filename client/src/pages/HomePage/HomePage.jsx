import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Navigate, useNavigate } from 'react-router-dom'
import Features from '../../components/Features/Features'

function HomePage() {
    const { user } = useAuthStore()
    const navigate = useNavigate()
  return (
    <div className="flex flex-col md:h-[100vh] h-[100vh] overflow-y-scroll items-center py-4 pt-25">
      <div className="flex flex-col w-[70vw] gap-7">
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Studosphere — <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Connect, Collaborate, Conquer Your Goals</span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl max-w-5xl mx-auto mb-10 leading-relaxed">
            StudoSphere is a comprehensive campus platform designed for students and placement heads. It offers AI-powered chat, categorized real-time forums, faculty smart search, and a collaborative to-do list synced with Google Calendar. Students can upload resumes, apply for skill-matched jobs, and engage with an intelligent chatbot. Placement heads can post jobs, send bulk emails with attachments, and track applications. Built using React, Tailwind CSS, MongoDB, and Express, StudoSphere streamlines campus life, academic success, and career readiness.
          </p>
          
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 animate-scale-in" onClick={()=> user ? navigate("/dashboard") : navigate("/login")} >{user ? "Go To Dashboard": "Sign In To Continue"}</button>
        </div>
        <Features />
      </div>
    </div>
  )
}

export default HomePage
