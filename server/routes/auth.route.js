import { Router } from "express";
import { callback, getAllUsers, getUser, logout, updateProfile } from "../controllers/auth.controller.js";
import passport from "passport";
import "../strategies/google-strategy.js";

const authRouter = Router();

authRouter.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/calendar.events", "https://mail.google.com/"],
    accessType: "offline",
    prompt: "consent",
    approval_prompt: "force",
  })
);

authRouter.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  callback
);

authRouter.get("/getuser", getUser);

authRouter.post("/logout", logout);

authRouter.get("/getusers", getAllUsers);

authRouter.put("/updateprofile", updateProfile)

export default authRouter;
