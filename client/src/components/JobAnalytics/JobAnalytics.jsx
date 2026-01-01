import React, { useEffect } from "react";
import Header from "../Header/Header";
import { useJobStore } from "../../store/useJobStore";
import CompaniesModal from "../CompaniesModal/CompaniesModal";

function JobAnalytics() {
  const {
    jobs,
    getJobs,
    companies,
    inReviewApplicants,
    shortListedApplicants,
    rejectedApplicants,
    averageSalary,
    averageCgpa,
  } = useJobStore();
  useEffect(() => {
    getJobs();
  }, []);
  const analyticsTexts = [
    "Jobs Posted",
    "Total Compnanies",
    "Total Applicants",
    "In Review Applicants",
    "Shorlisted Applicants",
    "Rejected Applicants",
    "Average Salary Offered",
    "Average CGPA Required",
  ];
  const analytics = [
    jobs.length,
    companies.length,
    inReviewApplicants + shortListedApplicants + rejectedApplicants,
    inReviewApplicants,
    shortListedApplicants,
    rejectedApplicants,
    averageSalary,
    averageCgpa,
  ];
  return (
    <div className="flex flex-col md:w-[75%] min-h-[93vh] w-[100%] overflow-y-scroll md:pt-18 pt-12">
      <Header heading={"Job Analytics"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-5 my-auto">
        <CompaniesModal companies={companies}/>
        {analyticsTexts.map((element, index) => {
          return (
            <div
              key={index}
              className={`card bg-base-100 card-lg shadow-sm backdrop-blur-sm border border-slate-700/50 rounded-xl hover:bg-base-100/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-base-100 animate-fade-in ${index == 1 && "cursor-pointer"}`}
              onClick={index == 1 ? ()=> (companies.length != 0 ? document.getElementById("my_companies_modal").showModal() : ()=>{}) : ()=>{}}
            >
              <div className="card-body gap-1">
                <h1 className="card-title text-lg">{analytics[index]}</h1>
                <h2 className="card-title font-semibold">{element}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default JobAnalytics;
