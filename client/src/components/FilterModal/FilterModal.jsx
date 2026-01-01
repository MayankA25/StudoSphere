import React, { useEffect, useRef, useState } from "react";
import { useFacultyStore } from "../../store/useFacultyStore";

export default function FilterModal() {
  const dropdowns = ["Department", "Designation", "Joining Date"];
  const ref = useRef(null);
  const { facultiesCopy3, setSelectedDropdown, applyFilters } =
    useFacultyStore();
  //   const [selectedDropdown, setSelectedDropdown] = useState();
  const [localDropdown, setLocalDropdown] = useState({
    Department: "Select",
    Designation: "Select",
    Joining_Date: "Select",
  });
  // console.log(facultiesCopy3)
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box overflow-visible">
        <h3 className="font-bold text-2xl mb-3">Filter</h3>
        <div className="py-4 grid gap-3.5">
          {dropdowns.map((dropdown, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-2 place-content-center text-center"
              >
                <h1 className="font-bold">{dropdown} </h1>
                <div
                  className={`dropdown ${
                    dropdown !== "Department" && "dropdown-top"
                  }`}
                >
                  <div tabIndex={index} role="button" className="btn m-1">
                    {localDropdown[dropdown.split(" ").join("_")]}
                  </div>
                  <ul
                    tabIndex={index}
                    className="dropdown-content menu bg-base-300 rounded-box z-50 w-52 p-2 shadow-sm max-h-45 grid overflow-y-scroll"
                  >
                    {facultiesCopy3.map((faculty, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() =>
                            setLocalDropdown({
                              ...localDropdown,
                              [dropdown.split(" ").join("_")]:
                                faculty[dropdown.split(" ").join("_")],
                            })
                          }
                        >
                          <a>
                            {dropdown.split(" ").join("_") &&
                              faculty[dropdown.split(" ").join("_")]}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
          <button
            className="btn btn-primary"
            onClick={() => {
              ref.current.click();
              setSelectedDropdown(localDropdown);
              applyFilters();
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button ref={ref}>close</button>
      </form>
    </dialog>
  );
}
