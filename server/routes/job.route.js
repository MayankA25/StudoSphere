import { Router } from "express";
import { addJob, applyForJob, deleteJob, editJob, getJobs } from "../controllers/job.controller.js";

const jobRouter = Router();

jobRouter.get("/getjobs", getJobs)
jobRouter.post("/addjob", addJob);
jobRouter.put("/editjob", editJob);
jobRouter.delete("/deletejob", deleteJob);
jobRouter.post("/apply", applyForJob);


export default jobRouter;