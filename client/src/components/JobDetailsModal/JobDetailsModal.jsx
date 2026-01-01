import React from 'react'
import { useJobStore } from '../../store/useJobStore'

export default function JobDetailsModal() {
    const { jobDetails, skills } = useJobStore();
  return (
    <dialog
      id={`my_job_detials`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">{jobDetails.jobName}</h3>
        <div className="flex flex-col justify-center gap-5">
            <div className="flex flex-col justify-center gap-1">
                <h1 className='font-semibold text-lg'>Description</h1>
                <p>{jobDetails.jobDescription}</p>
            </div>
            <div className="flex flex-col justify-center gap-2">
                <h1 className='font-semibold text-lg'>Skills Required</h1>
                <div className="grid grid-cols-4 gap-4">
                    {skills.map((skill, index)=>{
                        return (
                            <div key={index} className="flex items-center justify-center space-x-3 p-1 bg-slate-700/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 rounded-full  transition-colorshover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 animate-fade-in cursor-default">
                                <h1>{skill}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-3">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary" >Ok</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
