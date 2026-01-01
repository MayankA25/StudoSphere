import React from 'react'
import { useJobStore } from '../../store/useJobStore'

export default function DeleteJobModal({ index, id, jobName }) {
    const { deleteJob } = useJobStore();
  return (
    <dialog
      id={`my_job_delete_${index}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{jobName}</h3>
        <p className="py-4">Are You Sure You Want To Delete This Job</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-3">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">No</button>
            <button className="btn btn-primary" onClick={()=>{deleteJob(id)}} >Yes</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
