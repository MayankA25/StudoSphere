import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import { useMailerStore } from "./useMailerStore";
import { useAuthStore } from "./useAuthStore";

export const useJobStore = create((set, get) => ({
  skills: [""],
  jobs: [],
  jobsCopy: [],
  edit: false,
  jobDetails: { jobType: "Select Job Type", batch: `${new Date().getFullYear()}`.slice(2, 4) },
  number: 1,
  reject: false,
  companies: [],
  inReviewApplicants: 0,
  shortListedApplicants: 0,
  rejectedApplicants: 0,
  averageSalary: 0,
  averageCgpa: 0,

  setReject: async(val)=>{
    set({ reject: val })
  },


  setNumber: async (number) => {
    set({ number });
  },
  setEdit: async (val) => {
    set({ edit: val });
  },

  setSkills: async (skills) => {
    set({ skills });
  },

  getJobs: async () => {
    const companiesCopy = [...get().companies];
    let inReviewApplicants = 0;
    let shortListedApplicants = 0;
    let rejectedApplicants = 0;
    let totalSalary = 0;
    let totalCgpa = 0
    try {
      const response = await axiosInstance.get("/job/getjobs");
      // // // // console.log(response.data.jobs.reverse());
      let jobs = [...response.data.jobs];
      // if(!user.isHead ){
      //   jobs.forEach((element, index) => {
      //     if(element.applicants.includes(user.user._id) || element.shortListed.includes(user.user._id) || element.rejected.includes(user.user._id)){
      //       jobs.push(element);
      //       jobs.splice(index, 1)
      //     }
      //   });
      // }
      console.log("Jobs: ", response.data.jobs);
      // for(let i = 0; i<jobs.length; i++){
        //   console.log("Job: ", jobs[i]);
        //   if(!companiesCopy.includes(jobs[i].companyName)){
          //     companiesCopy.push(jobs[i].companyName);
          //   }
          //   inReviewApplicants += jobs[i].applicants.length;
          //   shortListedApplicants += jobs[i].shortListed.length;
          //   rejectedApplicants += jobs[i].rejectedUsers.length;
          
          //   totalSalary += jobs[i].salary;
          
          //   totalCgpa += job[i].cgpa
          // }
        jobs.forEach((job, index)=>{
          // console.log("Job: ", job);
          if(!companiesCopy.includes(job.companyName)){
            companiesCopy.push(job.companyName)
          }
          inReviewApplicants += job.applicants.length;
          shortListedApplicants += job.shortListed.length;
          rejectedApplicants += job.rejectedUsers.length;
          totalSalary += job.salary
          totalCgpa += job.cgpa
        })
          const avgSalary = totalSalary/jobs.length;
          const avgCgpa = Number.parseFloat(`${`${totalCgpa/jobs.length}`.split(".")[0]}.${`${totalCgpa/jobs.length}`.split(".")[1].slice(0, 2)}`);
          // console.log("Companies: ", companiesCopy);
          // console.log("In Review: ", inReviewApplicants);
          // console.log("Shortlisted: ", shortListedApplicants);
          // console.log("Rejected: ", rejectedApplicants);
          // console.log("Salary: ", avgSalary);
          // console.log("CGPA: ", avgCgpa);
          set({ jobs: response.data.jobs, jobsCopy: response.data.jobs, companies: companiesCopy, inReviewApplicants: inReviewApplicants, shortListedApplicants: shortListedApplicants, rejectedApplicants: rejectedApplicants, averageSalary: avgSalary, averageCgpa: avgCgpa });
          // set({  companies: companiesCopy, inReviewApplicants, shortListedApplicants, rejectedApplicants, averageSalary: `${(totalSalary/jobs.length).toString().split(".")[0]}.${(totalSalary/jobs.length).toString().split(".")[1].slice(0,2)}`, averageCgpa: `${(totalCgpa/jobs.length).toString().split(".")[0]}.${(totalCgpa/jobs.length).toString().split(".")[1].slice(0,2)}` });
    } catch (e) {
      // // // console.log(e);
    }
  },

  addJob: async (jobDetails) => {
    const newSkills = [];
    for(let i = 0; i<jobDetails.skills.length; i++){
      if(!newSkills.includes(jobDetails.skills[i])){
        newSkills.push(jobDetails.skills[i])
      }
    }
    jobDetails.skills = newSkills;
    // // // console.log(jobDetails);
    try {
      const response = await axiosInstance.post("/job/addjob", jobDetails);
      // // // console.log(response);
      set({ jobs: [ ...get().jobs, response.data.savedJob], jobsCopy: [...get().jobs, response.data.savedJob] });
      toast.success("Job Added");
    } catch (e) {
      // // // console.log(e);
      toast.error("Error While Adding Job")
    }
  },

  editJob: async (id, jobDetails) => {
    const jobsCopy = [...get().jobs];
    const newSkills = [];
    for(let i = 0; i<jobDetails.skills.length-1; i++){
      if(!newSkills.includes(jobDetails.skills[i])){
        newSkills.push(jobDetails.skills[i])
      }
    }
    jobDetails.skills = newSkills;
    try {
      const foundIndex = jobsCopy.findIndex((job, index) => job._id == id);
      jobsCopy.splice(foundIndex, 1, jobDetails);
      set({ jobs: jobsCopy, jobsCopy: jobsCopy });
      const response = await axiosInstance.put("/job/editjob", jobDetails);
      // // // console.log(response.data);
      toast.success("Job Updated")
    } catch (e) {
      // // // console.log(e);
      toast.error("Error While Updating Job")
    }
  },

  deleteJob: async(id)=>{
    const jobsCopy = [...get().jobs];
    const newJobs = jobsCopy.filter((element, index)=>element._id != id)
    set({ jobs: newJobs, jobsCopy: newJobs })
    try{
      await axiosInstance.delete("/job/deletejob", {
        params: {
          id
        }
      });
      toast.success("Job Deleted")
    }catch(e){
      // // // console.log(e);
      toast.error("Error While Deleting Job")
    }
  },

  getShortListed: async(jobIndex)=>{
    const jobs =[...get().jobs];
    jobs[jobIndex].applicants = jobs[jobIndex].shortListed;
    // // // console.log(jobs[jobIndex])
    set({ jobsCopy:jobs })
  },
  getRejected: async(jobIndex)=>{
    const jobs =[...get().jobs];
    jobs[jobIndex].applicants = jobs[jobIndex].rejectedUsers;
    // // // console.log(jobs[jobIndex])
    set({ jobsCopy:jobs })
  },

  resetApplicants: async(jobIndex)=>{
    const jobsCopy = [...get().jobsCopy];
    const jobs = [...get().jobs]
    jobsCopy[jobIndex].applicants = [...jobs[jobIndex].applicants];
    // // // console.log(jobsCopy[jobIndex])
    set({ jobsCopy })
  },
  shortlistApplicant: async(jobIndex, userIndex)=>{
    const jobs = [...get().jobs];
    const applicant = jobs[jobIndex].applicants[userIndex];
    jobs[jobIndex].shortListed.push(jobs[jobIndex].applicants[userIndex]);
    jobs[jobIndex].applicants.splice(userIndex, 1);
    // // // console.log("Job After Shortlisting: ", jobs[jobIndex]);
    set({ jobs: jobs, jobsCopy: jobs });
    try{
      const response = await axiosInstance.post("/job/apply", {
        id: jobs[jobIndex]._id,
        job: {...jobs[jobIndex]}
      });
      // // // console.log(response.data)
      const sendMail = useMailerStore.getState().sendMail;
      const setEmails = useMailerStore.getState().setEmails;
      setEmails([applicant.email]);
      await sendMail(`Regarding ${jobs[jobIndex].jobName} Application`, `Dear ${applicant.username}(${applicant.regNo}),<br></br>Congratulations,You Have Been Shortlisted For ${jobs[jobIndex].jobName} (${jobs[jobIndex].jobType}).<br></br>Contact Placement Head For More Information.<br></br>Good Luck.`, []);
      toast.success(`Successfully Shortlisted ${applicant.email}`)
    }catch(e){
      // // // console.log(e)
      toast.error("Error While Shorlisting")
    }
  },
  rejectApplicant: async(jobIndex, userIndex)=>{
    const jobs = [...get().jobs];
    const applicant = jobs[jobIndex].applicants[userIndex];
    jobs[jobIndex].rejectedUsers.push(jobs[jobIndex].applicants[userIndex]);
    jobs[jobIndex].applicants.splice(userIndex, 1);
    // // // console.log("Job After Shortlisting: ", jobs[jobIndex]);
    set({ jobs: jobs, jobsCopy: jobs });
    try{
      const response = await axiosInstance.post("/job/apply", {
        id: jobs[jobIndex]._id,
        job: {...jobs[jobIndex]}
      })
      // // // console.log(response.data);
      const sendMail = useMailerStore.getState().sendMail;
      const setEmails = useMailerStore.getState().setEmails;
      setEmails([applicant.email]);
      await sendMail(`Regarding ${jobs[jobIndex].jobName} Application`, `Dear ${applicant.username}(${applicant.regNo}),<br></br>Unfortunately,You Have Not Been Selected For ${jobs[jobIndex].jobName} (${jobs[jobIndex].jobType}).<br></br>Good Luck.`, []);
      toast.success(`Rejected ${applicant.email}`)
    }catch(e){
      // // // console.log(e)
      toast.error("Error While Rejecting")
    }
  },

  applyForJob: async(id, userId)=>{
    const jobsCopy = [...get().jobs];
    const foundJobIndex = jobsCopy.findIndex((job, index)=>job._id == id);
    jobsCopy[foundJobIndex].applicants = [...(jobsCopy[foundJobIndex].applicants), userId];
    // jobsCopy.push(jobsCopy[foundJobIndex])
    // jobsCopy.splice(foundJobIndex, 1);
    set({ jobsCopy: jobsCopy, jobs: jobsCopy })
    // // // console.log(jobsCopy[foundJobIndex]);
    // // // console.log(jobsCopy);
    try{
        const response = await axiosInstance.post("/job/apply", {
          id: id,
          job: {...jobsCopy[foundJobIndex]}
        });
        // // // console.log(response.data.updatedJob)
        toast.success("Applied Successfully!")
    }catch(e){
      // // // console.log(e);
      toast.error("Error While Applying")
    }
  },
  getAppliedJobs: async(userId)=>{
    set({ jobs: get().jobsCopy })
    const jobsCopy = [...get().jobs];
    const appliedJobs = jobsCopy.filter((job, index)=>{
      return job.applicants.includes(userId)
    });
    // // // console.log(appliedJobs);
    set({  jobs: appliedJobs })
  },
  setJobDetails: async (jobDetails) => {
    set({ jobDetails });
  },

  changeSkills: (index, val) => {
    const skillsCopy = [...get().skills];
    skillsCopy.splice(index, 1, val);
    // // // console.log(skillsCopy);
    set({ skills: skillsCopy });
  },
  removeSkill: async (index) => {
    const skillsCopy = [...get().skills];
    skillsCopy.splice(index, 1);
    // // // console.log(skillsCopy);
    set({ skills: skillsCopy });
  },
  checkDuplicateSkills: async (index, val) => {
    const skillsCopy = [...get().skills];
    const foundSkill = skillsCopy.find((skill, index1) => {
      if (index1 !== index) {
        return skill.toLowerCase() == val.toLowerCase();
      }
    });
    if (foundSkill) {
      skillsCopy.splice(index, 1, "");
      set({ skills: skillsCopy });
      // // // console.log(skillsCopy);
      toast.error("Duplicate Skills");
      return true;
    }
    return false;
  },
  searchJob: async(val)=>{
    // // // console.log(val)
    const jobs = [...get().jobs];
    const jobsCopy = [...get().jobsCopy];
    // // // console.log(jobs, jobsCopy)
    if(val.trim().length == 0){
      return set({ jobs: jobsCopy, jobsCopy: jobsCopy })
    }
    const filteredJobs = jobs.filter((element, index)=>{
      if(element.jobName.toLowerCase().startsWith(val.toLowerCase()) || element.companyName.toLowerCase().startsWith(val.toLowerCase()) || `${element.cgpa}`.startsWith(val.toLowerCase()) || `${element.batch}`.startsWith(val.toLowerCase()) || `${element.jobType}`.toLowerCase().startsWith(val.toLowerCase()) || element.skills.map((element)=>element.toLowerCase()).some((element)=>element.toLowerCase().startsWith(val.toLowerCase()))){
          return element
      }
    });
    // // // console.log(filteredJobs);
    set({ jobs: filteredJobs })
  },
  showMatchedSkillsJobs: async(skills)=>{
    set({ jobs: get().jobsCopy })
    const skillsCopy = skills;
    const jobs = [...get().jobs];
    const filteredJobs = jobs.filter((element, index)=>{
      let check = false;
      element.skills.forEach((skill)=>{
        // // // console.log(skillsCopy.map((elem)=>elem.toLowerCase()).includes(skill.toLowerCase()))
        if(skillsCopy.map((elem)=>elem.toLowerCase()).includes(skill.toLowerCase())){
          // // // console.log(element)
          check = true
        }
      });
      return check
    });
    // // // console.log(filteredJobs);
    set({ jobs: filteredJobs })
  }
}));
