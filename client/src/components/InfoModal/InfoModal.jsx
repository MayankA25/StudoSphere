import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

export default function InfoModa() {
  const { user, handleSubmit } = useAuthStore();
  const [cgpa, setCgpa] = useState(`${user.user.cgpa}`);
  return (
    <dialog id="my_info_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-5">Persoal Information</h3>
        <div className="flex flex-col justify-center gap-3.5 py-4">
          <div className="flex flex-col justify-center gap-1.5">
            <h1 className="font-bold">Email</h1>
            <input
              type="text"
              className="input input-primary w-[95%] bg-base-300"
              value={user.user.email}
              readOnly
            />
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <h1 className="font-bold">Department</h1>
            <input
              type="text"
              className="input input-primary w-[95%] bg-base-300"
              value={user.user.dept}
              readOnly
            />
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <h1 className="font-bold">CGPA (Upto 2 Decimals)</h1>
            <input
              type="text"
              className="input input-primary w-[95%] bg-base-200"
              value={cgpa}
              onChange={(e) => {
                setCgpa("");
                if (parseFloat(e.target.value) <= 10) {
                  setCgpa(`${e.target.value}`);
                }
              }}
            />
          </div>
          <div className="flex flex-col justify-center gap-1.5">
            <h1 className="font-bold">Batch</h1>
            <input
              type="text"
              className="input input-primary w-[95%] bg-base-300"
              value={user.user.batch}
              readOnly
            />
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
            <button
              className="btn btn-primary"
              onClick={() => {
                let temp = `${cgpa}.00`;
                if (temp.length > 0) {
                  temp = `${temp.split(".")[0]}.${temp
                    .split(".")[1]
                    .slice(0, 2)}`;
                  // console.log(
                  //   "1: ",
                  //   `${temp.split(".")[0]}.${temp.split(".")[1].slice(0, 2)}`
                  // );
                  if (temp.split(".")[0].length == 1) {
                    // console.log(
                    //   "2: ",
                    //   `0${temp.split(".")[0]}.${temp.split(".")[1].slice(0, 2)}`
                    // );
                    temp = `0${temp.split(".")[0]}.${temp
                      .split(".")[1]
                      .slice(0, 2)}`;
                  }
                }
                handleSubmit({
                  cgpa: parseFloat(
                    `${temp.split(".")[0]}.${temp.split(".")[1].slice(0, 2)}`
                  ),
                });
                toast.success("Updated");
              }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
