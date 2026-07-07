import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../models/User.js";
import dotenv from "dotenv";
import cloudinary from "../utils/cloudinary.js";

dotenv.config({ path: "D:\\Mayank Data\\CODING\\CodeFest'25\\server\\.env" });

const publicEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "yahoo.in",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "rediffmail.com",
  "mail.com",
];


passport.use(
  new Strategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: process.env.NODE_ENV == "production" ? "https://studosphere-2.onrender.com/api/auth/callback" : "http://localhost:5000/api/auth/callback",
      scope: ["profile", "email", "https://www.googleapis.com/auth/calendar.events", "https://mail.google.com/"],
      accessType: "offline",
      prompt: "consent",
      approval_prompt: "force"
    },
    async (accessToken, refreshTokem, profile, done) => {
      console.log("Profile: ", profile._json.family_name)
      const username = profile.displayName;
      const email = profile.emails[0].value;
      let profilePic;
      const id = profile.id;

      const emailDomain = email.split("@")[1];

      const isPublicDomain = publicEmailDomains.includes(emailDomain);

      // if(isPublicDomain) return done("Use College Gmail Id.", null)

      console.log(accessToken);
      console.log(refreshTokem);

      const response = await cloudinary.uploader.upload(profile.photos[0].value, { public_id: `users/${id}/profile` });
      profilePic = response.secure_url;

      let isHead = false;
      
      
      try {
        const foundUser = await User.findOne({ email });
        
        if (foundUser) {
          return done(null, {user: foundUser, accessToken, refreshTokem});
        }
        
        if(email=="mayank.23bai10505@vitbhopal.ac.in" || email == "studoshpere2509@gmail.com") isHead = true;
        
        // if(isHead){
          //   batch = regNo.slice(0, 2);
          //   dept = regNo.slice(2, 5).toUpperCase();
          //   console.log(batch, dept);
          // }

          let regNo = isHead || !isPublicDomain ? profile._json.family_name : "123456789" ;
          let batch = isPublicDomain ? 23 : Number.parseInt(email.split(".")[1].slice(0, 2));
          let dept = isPublicDomain ? "BAI" : email.split(".")[1].slice(2, 5).toUpperCase();

        const newUser = new User({
          username,
          email,
          profilePic,
          regNo,
          isHead,
          batch,
          dept,
          userId: id,
        });

        const savedUser = await newUser.save();

        return done(null, {user: savedUser, accessToken, refreshTokem});
      } catch (e) {
        console.log("Error Occured In Passport...");
        return done(e, null);
      }
    }
  )
);

passport.serializeUser((obj, done) => {
  return done(null, obj);
});

passport.deserializeUser(async (obj, done) => {
  try {
    const foundUser = await User.findOne({ email: obj.user.email });
    if (!foundUser) throw new Error("Unauthenticated");
    if (foundUser) return done(null, obj.user);
  } catch (e) {
    return done(e, null);
  }
});
