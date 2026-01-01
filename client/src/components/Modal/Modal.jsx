import React from "react";

export default function Modal({name, department, email, phoneNo, designation, officeRoom, joiningDate}) {
  return (
    <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{name}</h3>
    <div className="py-4 flex flex-col gap-2 justify-center">
        <div className="flex items-center gap-3">
            <h1 className="font-bold">Department: </h1>
            <h1 className="font-semibold">{department}</h1>
        </div>
        <div className="flex items-center gap-3">
            <h1 className="font-bold">Email: </h1>
            <h1 className="font-semibold">{email}</h1>
        </div>
        <div className="flex items-center gap-3">
            <h1 className="font-bold">Phone Number: </h1>
            <h1 className="font-semibold">{phoneNo}</h1>
        </div>
        <div className="flex items-center gap-3">
            <h1 className="font-bold">Designation: </h1>
            <h1 className="font-semibold">{designation}</h1>
        </div>
        <div className="flex items-center gap-3">
            <h1 className="font-bold">Cabin: </h1>
            <h1 className="font-semibold">{officeRoom}</h1>
        </div>
        <div className="flex items-center gap-3">
            <h1 className="font-bold">Joining Date: </h1>
            <h1 className="font-semibold">{joiningDate}</h1>
        </div>
    </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>
  );
}
