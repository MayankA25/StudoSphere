import React from "react";

export default function CompaniesModal({ companies }) {
  return (
    <dialog
      id="my_companies_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Companies</h3>
        <div className="py-4 grid grid-cols-4 gap-2">
          {companies.map((element, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center space-x-3 p-2 bg-slate-700/50 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-800/70 rounded-full  transition-colorshover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 animate-fade-in cursor-default"
              >
                <h1 className="text-center">{element}</h1>
              </div>
            );
          })}
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
