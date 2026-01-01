import { Job } from "../models/Job.js";

export const getJobs = async(req, res)=>{
    try{
        if(req.session.passport.user.user.isHead){
            const jobs = await Job.find().populate('applicants').populate('shortListed').populate('rejectedUsers');
            return res.status(200).json({ jobs });
        }
        const jobs = await Job.find();
        return res.status(200).json({ jobs })
    }catch(e){
        console.log(e)
        return res.status(400).json({ msg: "Error While Getting Jobs" })
    }
}

export const addJob = async (req, res) => {
  const {
    jobName,
    companyName,
    companyLogo,
    jobDescription,
    cgpa,
    batch,
    jobType,
    salary,
    skills,
    deadline,
  } = req.body;
  try {
    const newJob = new Job({
      jobName,
      companyName,
      companyLogo,
      jobDescription,
      cgpa,
      batch,
      jobType,
      salary,
      skills,
      deadline,
    });
    const savedJob = await newJob.save();
    return res.status(201).json({ savedJob });
  } catch (e) {
    console.log(e)
    return res.status(400).json({ msg: "Error While Adding Job" });
  }
};

export const editJob = async (req, res) => {
  const {
    id,
    jobName,
    companyName,
    companyLogo,
    jobDescription,
    cgpa,
    batch,
    jobType,
    salary,
    skills,
    deadline,
  } = req.body;
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        jobName,
        companyName,
        companyLogo,
        jobDescription,
        cgpa,
        batch,
        jobType,
        salary,
        skills,
        deadline,
      },
      { new: true }
    );
    return res.status(200).json({ updatedJob });
  } catch (e) {
    console.log(e)
    return res.status(400).json({ msg: "Error While Updating Job" });
  }
};

export const deleteJob = async(req, res)=>{
    const { id } = req.query;
    try{
        await Job.findByIdAndDelete(id);
        return res.status(200).json({ msg:"Job Deleted Successfully" })
    }catch(e){
        console.log(e);
        return res.status(400).json({ msg: "Error While Deleting Message" })
    }
}

export const applyForJob = async(req, res)=>{
    const { id, job } = req.body;
    try{
        const updatedJob = await Job.findByIdAndUpdate(id, { $set: { ...job } }, { new: true });
        console.log(updatedJob);
        return res.status(200).json({ updatedJob })
    }catch(e){
        console.log(e);
        return res.status(400).json({ msg: "Error While Applying" })
    }
}


// export const shortList = async(req, res)=>{
//   const { id, job } = req.body;
//   try{
//     const updatedJob = await Job.findByIdAndUpdate(id, { $set: {...job} }, { new: true });
//     console.log(updatedJob);
//     return res.status(200).json({ updatedJob })
//   }catch(e){
//     console.log(e);
//     return res.status(400).json({ msg: "Error While Shortlisting" })
//   }
// }
// export const reject = async(req, res)=>{
//   const { id, job } = req.body;
//   try{
//     const updatedJob = await Job.findByIdAndUpdate(id, { $set: {applicants: {...job}} });
//     console.log(updatedJob);
//     return res.status(400).json({ updatedJob })
//   }catch(e){
//     console.log(e);
//     return res.status(400).json({ msg: "Error While Shortlisting" })
//   }
// }