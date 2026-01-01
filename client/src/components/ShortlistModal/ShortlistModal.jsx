import React from "react";
import { useJobStore } from "../../store/useJobStore";

export default function ShortlistModal({index, userIndex, applicantName}) {
    const { shortlistApplicant, reject, rejectApplicant } = useJobStore();
  return (
    <dialog id={`my_shortlist_modal_${userIndex}`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{applicantName}</h3>
        <p className="py-4 text-sm">Are You Sure You Want To {reject ? <span className="text-primary">REJECT</span> : <span className="text-primary">SHORTLIST</span>} <span className="text-accent">{applicantName}</span> and Notify Them Through Mail</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-1.5">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
            <button className="btn btn-primary" onClick={()=>reject ? rejectApplicant(index, userIndex) : shortlistApplicant(index, userIndex)}>Yes</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
