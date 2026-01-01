import { Router } from "express";
import { getFaculties, uploadFaculties } from "../controllers/faculty.router.js";
import { checkLogin } from "../middleware/checkLogin.js";

const facultyRouter = Router();

facultyRouter.post("/upload", checkLogin, uploadFaculties);
facultyRouter.get("/getfaculties",checkLogin, getFaculties)

export default facultyRouter;
