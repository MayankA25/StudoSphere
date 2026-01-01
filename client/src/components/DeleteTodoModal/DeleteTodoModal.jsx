import React from "react";
import { useTodoStore } from "../../store/useTodoStore";

function DeleteTodoModal({index, title, id}) {
    const { deleteTodo } = useTodoStore();
  return (
    <dialog id={`my_todo_delete_modal_${index}`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">Are you sure you want to delete this modal</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
            <button className="btn btn-error text-white" onClick={()=>deleteTodo(id)}>Delete</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default DeleteTodoModal;
