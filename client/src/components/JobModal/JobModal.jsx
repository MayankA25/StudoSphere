import { Loader2, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useJobStore } from "../../store/useJobStore";
import { uploadAttachments } from "../../utils/uploadFile";

export default function JobModal() {
  // const [number, setNumber] = useState(1);
  const {
    skills,
    changeSkills,
    removeSkill,
    checkDuplicateSkills,
    addJob,
    edit,
    jobDetails,
    setJobDetails,
    number, 
    setNumber,
    editJob,
  } = useJobStore();
  const [uploading, setUploading] = useState(false);


  useEffect(()=>{
    // console.log("Job Details: ", jobDetails)
  }, [jobDetails])

  const handleLogoUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("files", file);
    const urls = await uploadAttachments(formData);
    setJobDetails({ ...jobDetails, companyLogo: urls[0] });
    setUploading(false);
  };
  return (
    <dialog
      id={`my_job_modal`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{edit ? "Edit Job" : "Add Job"}</h3>
        <div className="flex flex-col items-center py-3 gap-3">
          <div className="flex flex-col gap-1.5 w-full">
            <h1 className="font-bold ">Job Title</h1>
            <input
              type="text"
              value={jobDetails.jobName || ""}
              className="input input-primary w-full"
              placeholder="Enter Job Title"
              onChange={(e) => {
                setJobDetails({ ...jobDetails, jobName: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <h1 className="font-bold ">Company Name</h1>
            <input
              type="text"
              value={jobDetails.companyName || ""}
              className="input input-primary w-full"
              placeholder="Enter Company Name"
              onChange={(e) =>
                setJobDetails({ ...jobDetails, companyName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <h1 className="font-bold ">Company Logo</h1>
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-primary w-[80%]"
                onChange={handleLogoUpload}
              />
              {uploading && (
                <Loader2 className="animate animate-spin text-primary" />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <h1 className="font-bold ">Job Description</h1>
            <textarea
              type="text"
              value={jobDetails.jobDescription || ""}
              className="textarea textarea-primary w-full"
              placeholder="Enter Job Title"
              onChange={(e) =>
                setJobDetails({ ...jobDetails, jobDescription: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <h1 className="font-bold ">CGPA Criteria</h1>
            <input
              type="number"
              value={jobDetails.cgpa || ""}
              className="input input-primary w-full"
              placeholder="Enter CGPA Criteria"
              onChange={(e) =>
                setJobDetails({ ...jobDetails, cgpa: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <h1 className="font-bold">Batch</h1>
            <select
              className="select select-primary"
              value={`${`${new Date(Date.now()).getFullYear()}`.slice(0, 2)}${jobDetails.batch}`}
              onChange={(e) => {
                // console.log(e.target.value)
                setJobDetails({
                  ...jobDetails,
                  batch: parseInt(`${e.target.value}`.slice(2, 5)),
                });
              }}
            >
              <option disabled={true}>{new Date(Date.now()).getFullYear()}</option>
              {[...Array(7)].map((_, index)=>{
                return (
                  <option key={index}>{new Date().getFullYear() - index}</option>
                )
              })}
            </select>
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <h1 className="font-bold">Job Type</h1>
            <select
              // defaultValue={"Select Job Type"}
              value={jobDetails.jobType || ""}
              className="select select-primary"
              onChange={(e) => {
                  setJobDetails({ ...jobDetails, jobType: e.target.value });
                }}
            >
              <option disabled={true}>Select Job Type</option>
              <option>
                Internship
              </option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Remote</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <h1 className="font-bold">Salary (Annually)</h1>
            <input
              type="number"
              value={jobDetails.salary || ""}
              className="input input-primary w-full"
              placeholder="Enter Salary"
              onChange={(e) => {
                setJobDetails({
                  ...jobDetails,
                  salary: parseFloat(e.target.value),
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <h1 className="font-bold">Deadline</h1>
            <input
              type="date"
              className="input input-primary w-full"
              value={jobDetails.deadline || ""}
              onChange={(e) => {
                setJobDetails({
                  ...jobDetails,
                  deadline: new Date(e.target.valueAsDate)
                    .toISOString()
                    .split("T")[0],
                });
              }}
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <h1 className="font-bold">Skills</h1>
            {[...Array(number)].map((element, index) => {
              return (
                <div key={index} className="flex items-center gap-3 mb-2">
                  <input
                    type="text"
                    value={skills[index] || ""}
                    className="input input-primary w-[70%]"
                    placeholder={`Enter Skill ${index + 1}`}
                    onChange={(e) => {
                      changeSkills(index, e.target.value);
                    }}
                  />
                  {index == number - 1 ? (
                    <div
                      className="flex items-center justify-center gap-.5 bg-base-200 p-2 rounded-lg cursor-pointer"
                      onClick={async () => {
                        if (skills[index].trim().length == 0) {
                          toast.error("Fill The Field");
                        } else {
                          const duplicate = await checkDuplicateSkills(
                            index,
                            skills[index]
                          );
                          // console.log(duplicate);
                          !duplicate && setNumber(number + 1);
                        }
                      }}
                    >
                      <Plus />
                      <h1>Add Skill</h1>
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center bg-base-300 p-1 rounded-md cursor-pointer"
                      onClick={() => {
                        removeSkill(index);
                        setNumber(number - 1);
                      }}
                    >
                      <X />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-1.5">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn"
              onClick={() => {
              }}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              disabled={uploading}
              onClick={() => {
                // console.log(skills.length);
                // console.log(jobDetails);
                if (
                  jobDetails.deadline &&
                  jobDetails.jobName &&
                  jobDetails.jobDescription &&
                  jobDetails.batch &&
                  jobDetails.jobType &&
                  jobDetails.salary &&
                  skills.length != 0 &&
                  Number.parseFloat(jobDetails.cgpa) <= 10 &&
                  Number.parseFloat(jobDetails.cgpa) >= 0 &&
                  (new Date(jobDetails.deadline) >= new Date(Date.now()) ||
                    new Date(jobDetails.deadline).toISOString().split("T")[0] ==
                      new Date(Date.now()).toISOString().split("T")[0])
                ) {
                  !edit
                    ? addJob({
                        ...jobDetails,
                        skills: skills,
                        cgpa: parseFloat(
                          `${jobDetails.cgpa.split(".")[0]}.${jobDetails.cgpa
                            .split(".")[1]
                            ?.slice(0, 2)}`
                        ),
                      })
                    : editJob(jobDetails._id, {
                        ...jobDetails,
                        skills: skills,
                        cgpa: parseFloat(
                          `${jobDetails.cgpa.toString().split(".")[0]}.${jobDetails.cgpa.toString()
                            .split(".")[1]
                            ?.slice(0, 2)}`
                        ),
                      });
                } else {
                  // e.target.value = new Date(Date.now())
                  //   .toISOString()
                  //   .split("T")[0];
                  toast.error(
                    "Fill All The Required Fields And Make Sure They Are Valid"
                  );
                }
              }}
            >
              {edit ? "Edit Job" : "Post Job"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
