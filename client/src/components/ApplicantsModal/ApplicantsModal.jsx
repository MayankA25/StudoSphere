import React, { useEffect, useRef } from "react";
import { useJobStore } from "../../store/useJobStore";
import { Check, Paperclip, Trash2, User, X } from "lucide-react";
import ShortlistModal from "../ShortlistModal/ShortlistModal";

export default function ApplicantsModal({ index, id, jobName }) {
  const {
    applicants,
    getApplicants,
    shortlistApplicant,
    getShortListed,
    jobsCopy,
    getJobs,
    getRejected,
    rejectApplicant,
    setReject
  } = useJobStore();

  return (
    <dialog id={`my_applicants_modal_${index}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Applicants: </h3>

        <div className="flex flex-col my-4 ">
          <div className="flex flex-col justify-center bg-base-300 px-3 py-4 rounded-lg gap-2">
            <div className="flex items-center gap-1">
              <h1 className="text-sm font-semibold opacity-60">{jobName}</h1>
            </div>
          </div>
          <div className="my-3 flex flex-col text-lg mt-7 gap-2">
            <h1>Applicants({jobsCopy[index].applicants.length}): </h1>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="radio-4"
                    className="radio radio-sm radio-primary"
                    onChange={(e) => {
                      e.target.checked && getShortListed(index);
                    }}
                  />

                  <h1 className="text-sm">Shortlisted</h1>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="radio-4"
                    className="radio radio-primary radio-sm"
                    onChange={(e) => {
                      e.target.checked && getRejected(index);
                    }}
                  />
                  <h1 className="text-sm">Rejected</h1>
                </div>
              </div>
              <button
                className="btn"
                onClick={() => {
                  getJobs();
                  const radios = Array.from(
                    document.getElementsByName("radio-4")
                  );
                  radios.forEach((radio, index) => {
                    radio.checked = false;
                  });
                }}
              >
                Show All
              </button>
            </div>
            <div className="flex flex-col my-3 gap-2 min-h-0 max-h-60 overflow-y-scroll">
              {jobsCopy[index].applicants.map((element, userIndex) => {
                return (
                  <div
                    key={userIndex}
                    className="flex flex-col gap-2 bg-base-200 p-2 py-3 rounded-lg"
                  >
                    <ShortlistModal index={index} applicantName={element.email} userIndex={userIndex}/>
                    <div className="flex items-center gap-1.5">
                      <img
                        src={element.profilePic}
                        className="w-7 rounded-full mr-0.5"
                        alt=""
                      />
                      <p>{element.email}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <h1 className="text-xs font-normal opacity-60">
                          {element.username}
                        </h1>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {element.resume ? (
                          <a
                            href={element.resume}
                            target="_blank"
                            className="btn btn-xs flex hover:btn-primary  "
                          >
                            <Paperclip className="size-4" />{" "}
                            <p className="text-xs">Show Resume</p>
                          </a>
                        ): (
                          <button className="btn btn-xs" disabled={true}>No Resume</button>
                        )}
                        {!jobsCopy[index].rejectedUsers.includes(
                              element
                            )&&
                          <button
                            disabled={jobsCopy[index].shortListed.includes(
                              element
                            )}
                            className="btn btn-xs flex hover:btn-primary"
                            onClick={() => 
                              {
                                document.getElementById(`my_shortlist_modal_${userIndex}`).showModal()
                              }}


                          >
                            {!jobsCopy[index].shortListed.includes(
                              element
                            )&&<Check className="size-4" />}{" "}
                            <p className="text-xs">Shortlist</p>
                          </button>
                        }
                        {!jobsCopy[index].shortListed.includes(
                              element
                            )&&
                          <button
                            disabled={jobsCopy[index].rejectedUsers.includes(
                              element
                            )}
                            className="btn btn-xs flex hover:btn-error hover:text-white"
                            onClick={() => {setReject(true); document.getElementById(`my_shortlist_modal_${userIndex}`).showModal()}}
                          >
                            {!jobsCopy[index].rejectedUsers.includes(
                              element
                            ) && <X className="size-4" />}{" "}
                            <p className="text-xs">{jobsCopy[index].rejectedUsers.includes(
                              element
                            ) ? "Rejected" : "Reject"}</p>
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
