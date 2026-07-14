import { Router } from "express";
import { addJob, applyForJob, deleteJob, editJob, getJobs } from "../controllers/job.controller.js";
import { checkLogin } from "../middleware/checkLogin.js";
import { checkAdminLogin } from "../middleware/admin.middleware.js";

const jobRouter = Router();

jobRouter.get("/getjobs",checkLogin, getJobs)
jobRouter.post("/addjob",checkLogin,checkAdminLogin, addJob);
jobRouter.put("/editjob",checkLogin,checkAdminLogin, editJob);
jobRouter.delete("/deletejob",checkLogin,checkAdminLogin, deleteJob);
jobRouter.post("/apply",checkLogin, checkAdminLogin, applyForJob);


export default jobRouter;