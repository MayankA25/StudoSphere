import { Plus } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import JobModal from "../JobModal/JobModal";
import { useJobStore } from "../../store/useJobStore";
import DeleteJobModal from "../DeleteJobModal/DeleteJobModal";
import JobDetailsModal from "../JobDetailsModal/JobDetailsModal";
import ApplyJobModal from "../ApplyJobModal/ApplyJobModal";
import ApplicantsModal from "../ApplicantsModal/ApplicantsModal";

export default function Jobs() {
  const { user } = useAuthStore();
  const {
    getJobs,
    jobs,
    // jobsCopy,
    edit,
    setEdit,
    setJobDetails,
    setSkills,
    setNumber,
    getAppliedJobs,
    searchJob,
    showMatchedSkillsJobs,
  } = useJobStore();
  useEffect(() => {
    getJobs();
  }, []);
  const ref = useRef(null);
  return (
    <div className="flex flex-col gap-5 w-[100%] min-h-[93vh] md:w-[75%] overflow-y-scroll pb-4 md:pt-18 pt-12">
      <div className="flex items-center justify-between bg-base-300 relative">
        <h1 className="p-3 font-bold text-lg">Jobs</h1>
      </div>
      <JobModal />
      <JobDetailsModal />

      <div className="flex flex-col justify-center px-3 gap-4">
        <div className="flex flex-col items-center justify-between gap-5">
          <input
            type="text"
            className="input input-primary w-[90%]"
            placeholder="Search Jobs By Job Name, Company Name, CGPA, Skills, Batch, Job Type"
            onChange={(e) => {
              for(const elem of document.getElementsByName("radio-2")){
                  elem.checked = false;
                }
              searchJob(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          {user.user.isHead && (
            <div
              className="flex items-center justify-center md:gap-1.5 gap-0.5 bg-primary/10 px-2 py-2.5 rounded-lg h-full cursor-pointer"
              onMouseOver={() => {
                setEdit(false);
              }}
              onClick={() => {
                setSkills([""]);
                setNumber(1);
                setJobDetails({
                  jobType: "Select Job Type",
                  batch: `${new Date().getFullYear()}`.slice(2, 4),
                });
                document.getElementById("my_job_modal").showModal();
              }}
            >
              <Plus className="font-bold size-3 md:size-4" />
              <h1 className="font-bold text-xs md:text-sm">Post Job</h1>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-3xl flex items-center gap-3">
            {user.user.isHead ? "Posted Jobs" : "Available Jobs"}
            <div className="flex items-center text-sm gap-1">
              {!user.user.isHead && (
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary size-4 rounded-full"
                  onChange={(e) => {
                    e.target.checked && getAppliedJobs(user.user._id);
                  }}
                />
              )}
              {!user.user.isHead && (
                <h1 className="font-normal">Show In Review Jobs Only</h1>
              )}
            </div>
            <div className="flex items-center text-sm gap-1">
              {!user.user.isHead && user.user.skills.length != 0 && (
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary size-4 rounded-full"
                  onChange={(e) => {
                    e.target.checked && showMatchedSkillsJobs(user.user.skills);
                  }}
                />
              )}
              {!user.user.isHead && user.user.skills.length != 0 && (
                <h1 className="font-normal">
                  Show Jobs That Matches With My Skills
                </h1>
              )}
            </div>
            { !user.user.isHead && user.user.skills.length != 0 &&<button
              ref={ref}
              onClick={() => {
                for(const elem of document.getElementsByName("radio-2")){
                  elem.checked = false;
                }
                getJobs();
              }}
              className="btn btn-primary font-bold items-center text-sm gap-1"
            >
              
                <h1 className="font-normal">Show All Jobs</h1>
              
            </button> }
          </h1>
          <div className="flex flex-col justify-center py-5">
            {jobs.length !== 0 ? (
              jobs.map((job, index) => {
                return (
                  <div
                    key={index}
                    className="collapse bg-base-100 border border-base-300 "
                  >
                    {user.user.isHead && (
                      <DeleteJobModal
                        index={index}
                        id={job._id}
                        jobName={job.jobName}
                      />
                    )}
                    {!user.user.isHead && (
                      <ApplyJobModal index={index} id={job._id} jobName={job.jobName} />
                    )}
                    {user.user.isHead && (
                      <ApplicantsModal
                        jobName={job.jobName}
                        id={job._id}
                        index={index}
                      />
                    )}
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold flex justify-between items-center">
                      <div className="flex justify-between items-center w-full relative">
                        <h1 className="font-bold text-xl">{job.jobName}</h1>
                        <h1 className="font-semibold flex gap-2">
                          <span className="font-bold">
                            Deadline: {new Date(job.deadline).toDateString()}
                          </span>
                        </h1>
                        {job.companyLogo && (
                          <img
                            src={job.companyLogo}
                            className="w-15 h-15 rounded-full object-contain "
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                    <div className="collapse-content text-sm flex flex-col gap-4">
                      <ul className="flex-col flex px-3 gap-2">
                        <li className="list-disc">
                          <span className="font-bold">
                            Posted On: {new Date(job.createdAt).toDateString()}
                          </span>{" "}
                        </li>
                        <li className="list-disc">
                          <span className="font-bold">
                            Deadline: {new Date(job.deadline).toDateString()}
                          </span>{" "}
                        </li>
                        <li className="list-disc">
                          <span className="font-bold">
                            Company Name: {job.companyName}
                          </span>{" "}
                        </li>
                        <li className="list-disc">
                          <span className="font-bold">Batch: {job.batch}</span>{" "}
                        </li>
                        <li className="list-disc">
                          <span className="font-bold">
                            CGPA Required: {job.cgpa}
                          </span>{" "}
                        </li>
                        <li className="list-disc">
                          <span className="font-bold">
                            Job Type: {job.jobType}
                          </span>{" "}
                        </li>
                        <li className="list-disc">
                          <span className="font-bold">
                            Salary (Annually): {job.salary}
                          </span>{" "}
                        </li>
                        <li className="list-disc">
                          <span className="font-bold">
                            Applicants:{" "}
                            {job.applicants.length +
                              job.shortListed.length +
                              job.rejectedUsers.length}
                          </span>{" "}
                        </li>
                      </ul>

                      <div className="flex flex-col gap-3 font-bold">
                        {
                          <button
                            className="btn btn-primary font-bold"
                            onClick={() => {
                              setJobDetails({ ...job });
                              setSkills(job.skills);
                              document
                                .getElementById("my_job_detials")
                                .showModal();
                            }}
                          >
                            Show Details
                          </button>
                        }
                        {!user.user.isHead && (
                          <button
                            className={`btn ${
                              job.applicants.includes(user.user._id) &&
                              "btn-primary"
                            } font-bold`}
                            disabled={
                              job.applicants.includes(user.user._id) ||
                              job.shortListed.includes(user.user._id) ||
                              job.rejectedUsers.includes(user.user._id)
                            }
                            onClick={() => {
                              if (job.applicants.includes(user.user._id))
                                return;

                              document
                                .getElementById(`apply_job_modal_${index}`)
                                .showModal();
                            }}
                          >
                            {!job.applicants.includes(user.user._id) &&
                              !job.shortListed.includes(user.user._id) &&
                              !job.rejectedUsers.includes(user.user._id) &&
                              "Apply"}
                            {job.applicants.includes(user.user._id) &&
                              "In Review"}
                            {job.shortListed.includes(user.user._id) &&
                              "Shortlisted"}
                            {job.rejectedUsers.includes(user.user._id) &&
                              "Rejected"}
                          </button>
                        )}
                        {user.user.isHead && (
                          <button
                            className="btn btn-primary font-bold"
                            onClick={() =>
                              document
                                .getElementById(`my_applicants_modal_${index}`)
                                .showModal()
                            }
                          >
                            Show Applicants
                          </button>
                        )}
                        {user.user.isHead && (
                          <button
                            className="btn font-bold"
                            onMouseOver={() => setEdit(true)}
                            onClick={() => {
                              setJobDetails({
                                ...job,
                                deadline: new Date(job.deadline)
                                  .toISOString()
                                  .split("T")[0],
                              });
                              setSkills(job.skills);
                              setNumber(job.skills.length);
                              document
                                .getElementById(`my_job_modal`)
                                .showModal();
                            }}
                          >
                            Edit Job
                          </button>
                        )}
                        {user.user.isHead && (
                          <button
                            className="btn btn-error text-white font-bold"
                            onClick={() =>
                              document
                                .getElementById(`my_job_delete_${index}`)
                                .showModal()
                            }
                          >
                            Delete Job
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="font-bold text-center text-lg">
                {user.user.isHead ? "No Jobs Posted" : "No Available Jobs"}
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
