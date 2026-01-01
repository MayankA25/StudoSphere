import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import {
  Download,
  DownloadCloud,
  DownloadIcon,
  Filter,
  X,
} from "lucide-react";
import Modal from "../Modal/Modal";
import * as xlsx from "xlsx";
import { useFacultyStore } from "../../store/useFacultyStore";
import { useAuthStore } from "../../store/useAuthStore";
import FilterModal from "../FilterModal/FilterModal";
import toast from "react-hot-toast";

export default function FacultyDetails() {
  const {
    getFaculties,
    setFaculties,
    faculties,
    search,
    selectedDropdown,
    removeFilters,
  } = useFacultyStore();
  const { user } = useAuthStore();
  useEffect(() => {
    getFaculties();
  }, []);

  const opt = ["Select", "None"];

  const downloadExcel = () => {
    const template = [
      {
        Name: "",
        Department: "",
        Email: "",
        Phone_Number: "",
        Designation: "",
        Office_Room: "",
        Joining_Date: "",
      },
    ];
    const worksheet = xlsx.utils.json_to_sheet(template);
    worksheet["!cols"] = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Faculties");

    xlsx.writeFile(workbook, "faculties.xlsx");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    let check = false;
    let check2 = false;

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = xlsx.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet, {raw: false});

      const updatedData = jsonData.map((element) => {
        if(!element.Name || !element.Department || !element.Designation || !element.Email || !element.Office_Room || !element.Joining_Date) check = true;
        // console.log(element.Joining_Date.split("-")[0])
        if(element.Joining_Date.split("-")[0].length == 4 && element.Joining_Date.split("-")[1].length == 2 && element.Joining_Date.split("-")[2].length == 2){

          return (element = { ...element, user: user.user._id });
        }
        else{
          check2 = true
        }
      });
      if(check) return toast.error("Not All The Required Fields Present!")
      if(check2) return toast.error("Incorrect Date Format!")
      // console.log(updatedData);
      setFaculties(updatedData);
    };
    reader.readAsArrayBuffer(file);
  };
  // console.log(selectedDropdown);
  return (
    <div className="flex flex-col md:w-[75%] min-h-[93vh] w-[100%] overflow-y-scroll md:pt-18 pt-12">
      <Header heading={"Faculty Details"} />
      <div className="flex flex-col px-4 py-3 gap-6 h-fit">
        <div className="flex gap-4 items-center justify-left">
          <h1 className="font-bold text-sm md:text-lg">
            You can Download, Edit and Upload The Sample Excel Sheet
          </h1>
          <div
            className="flex items-center justify-center bg-primary rounded-md p-1.5 cursor-pointer btn btn-sm"
            onClick={() => downloadExcel()}
          >
            <DownloadIcon className="text-primary-content/90 size-5" />
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center justify-left">
          <h1 className="font-bold text-sm md:text-lg">Upload Excel File</h1>
          <h1 className="font-bold text-sm md:text-lg text-accent" >Excel Sheet Must Contain "Name", "Department", "Email", "Designation", "Office_Room", "Joining_Date(YYYY-MM-DD)"</h1>
          <input
            type="file"
            accept=".xls,.xlsx"
            className="file-input file-input-primary input-sm"
            onChange={handleFileUpload}
          />
        </div>
        <div className="flex flex-col text-lg z-10 bg-base-200 py-3 gap-1.5">
          <h1 className="font-bold text-md">Search Faculties</h1>
          <div className="flex justify-center gap-3 items-center">
            <input
              type="text"
              className="input input-primary w-full"
              placeholder="Search Faculty By Name"
              onChange={(e) => search(e.target.value)}
            />
            <FilterModal />
            <button
              onClick={() => document.getElementById("my_modal_2").showModal()}
              className="bg-primary p-2 rounded-md relative btn"
            >
              <Filter className="text-primary-content size-5" />
              {!(
                opt.includes(selectedDropdown.Department) &&
                !(
                  opt.includes(selectedDropdown.Designation) &&
                  !opt.includes(selectedDropdown.Joining_Date)
                )
              ) && (
                <div className="flex bg-green-400 size-3 rounded-full absolute -top-0.5 -right-0.5"></div>
              )}
            </button>
            {!(
              opt.includes(selectedDropdown.Department) &&
              !(
                opt.includes(selectedDropdown.Designation) &&
                !opt.includes(selectedDropdown.Joining_Date)
              )
            ) && (
              <button
                onClick={() => removeFilters()}
                className="cursor-pointer p-0.5 rounded-md"
              >
                <X className="size-5" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col h-[72%] gap-3 relative">
          <h1 className="font-bold text-lg">Faculties</h1>
          {(selectedDropdown.Department !== "Select" ||
            selectedDropdown.Designation !== "Select" ||
            selectedDropdown.Joining_Date !== "Select") && (
            <div className="flex gap-1 items-center">
              <h1 className="font-bold text-lg"> Filter Applied!</h1>{" "}
              {selectedDropdown.Department !== "Select" && (
                <h1 className="font-semibold">
                  Department: {selectedDropdown.Department}
                </h1>
              )}{" "}
              {selectedDropdown.Designation !== "Select" && (
                <h1 className="font-semibold">
                  ,Designation: {selectedDropdown.Designation}
                </h1>
              )}{" "}
              {selectedDropdown.Joining_Date !== "Select" && (
                <h1 className="font-semibold">
                  ,Joining Date: {selectedDropdown.Joining_Date}
                </h1>
              )}{" "}
            </div>
          )}
          <div className="card w-full bg-base-100 card-md shadow-sm mb-3">
            {faculties.length != 0 && (
              <div className="grid grid-cols-4 lg:grid-cols-5 p-4 items-center text-center gap-5">
                <p className="font-bold text-sm md:text-lg">Name</p>
                <p className="font-bold text-sm md:text-lg">Designation</p>
                <p className="font-bold text-sm md:text-lg hidden lg:block">Email</p>
                <p className="font-bold text-sm md:text-lg">Cabin</p>
                <div className="justify-end card-actions opacity-0"></div>
              </div>
            )}
          </div>
          {faculties.length != 0 ? (
            faculties.map((faculty, index) => {
              return (
                <div key={index} className="flex flex-col gap-4">
                  <Modal
                    name={faculty.Name}
                    department={faculty.Department}
                    email={faculty.Email}
                    phoneNo={faculty.Phone_Number}
                    designation={faculty.Designation}
                    officeRoom={faculty.Office_Room}
                    joiningDate={faculty.Joining_Date}
                  />
                  <div className="card w-full bg-base-100 card-md shadow-sm">
                    <div className="grid grid-cols-4 lg:grid-cols-5 p-4 items-center text-center gap-5">
                      <h2 className="card-title text-sm md:text-lg">{faculty.Name}</h2>
                      <p className="text-sm md:text-lg">{faculty.Designation}</p>
                      <p className="hidden lg:block text-sm md:text-lg">{faculty.Email}</p>
                      <p className="text-sm md:text-lg">{faculty.Office_Room}</p>
                      <div className="justify-end card-actions">
                        <button
                          onClick={() =>
                            document.getElementById("my_modal_1").showModal()
                          }
                          className="btn btn-primary w-full btn-sm"
                        >
                          More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="font-bold flex justify-center items-center">
              No Faculties
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
