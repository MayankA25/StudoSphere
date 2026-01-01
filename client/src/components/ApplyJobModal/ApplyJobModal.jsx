import React from "react";
import { useJobStore } from "../../store/useJobStore";
import { useAuthStore } from "../../store/useAuthStore";

export default function ApplyJobModal({id,  jobName, index }) {
    const { user } = useAuthStore();
    const { applyForJob } = useJobStore();
  return (
    <dialog
      id={`apply_job_modal_${index}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{jobName}</h3>
        <div className="flex flex-col">
          <p className="py-4">
            {user.user.resume ? "Are You Sure You Want To Apply For This Job With Your Current Resume" : "You Have Not Upload Your Resume. Do You Still Want To Apply"}
          </p>
          {user.user.resume && <a href={user.user.resume} target="_blank" className="btn btn-primary">Show Resume</a>}
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-3">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">No</button>
            <button
            onClick={()=>applyForJob(id, user.user._id)}
              className="btn btn-primary"
            >
              Yes
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
