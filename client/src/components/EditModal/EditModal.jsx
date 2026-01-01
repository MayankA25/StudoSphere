import React, { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";

export default function EditModal({ messageId, text, modalNo }) {
  const [edit, setEdit] = useState(text);
  const { editText } = useChatStore();
  const ref = useRef(null);
  return (
    <dialog id={`my_modal_${modalNo}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button ref={ref} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={(e) => {e.preventDefault(); editText(messageId, edit); ref.current.click()}}>
          <h3 className="font-bold text-lg">Edit Message</h3>
          <div className="py-4 flex">
            <input
              type="text"
              className="input input-primary w-full"
              value={edit}
              onChange={(e) => setEdit(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary w-full"
            
          >
            Edit Text
          </button>
        </form>
      </div>
    </dialog>
  );
}
