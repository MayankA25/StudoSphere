import React from "react";
import { useChatStore } from "../../store/useChatStore";

export default function DeleteModal({ modalNo, text, messageId }) {
    const {deleteText} = useChatStore();
    // console.log(messageId)
  return (
    <dialog
      id={`my_modal_del_${modalNo}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{text}</h3>
        <p className="py-4">Are You Sure You Want To Delete This Message</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-3">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">No</button>
            <button className="btn btn-primary" onClick={()=>deleteText(messageId)} >Yes</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
