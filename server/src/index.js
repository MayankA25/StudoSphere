import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import session from "express-session"
import Mongo from "connect-mongo"
import passport from "passport"
import authRouter from "../routes/auth.route.js"
import { checkLogin } from "../middleware/checkLogin.js"
import cors from "cors"
import { app, server } from "../utils/socket.js"
import forumRouter from "../routes/forum.route.js"
import facultyRouter from "../routes/faculty.route.js"
import todoRouter from "../routes/todo.route.js"
import chatbotRouter from "../routes/chatbot.route.js"
import path from "path";
import mailRouter from "../routes/mail.route.js"
import jobRouter from "../routes/job.route.js"

dotenv.config({ path: "D:\\Mayank Data\\CODING\\CodeFest'25\\server\\.env" })

const __dirname = path.resolve()
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected To MongoDB")
}).catch((e)=>{
    console.log("Error While Connecting To MongoDB")
})

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
        secure: false,
        httpOnly: true
    },
    store: Mongo.create({
        client: mongoose.connection.getClient()
    })
}))

app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//   res.setHeader('Pragma', 'no-cache');
//   res.setHeader('Expires', '0');
//   next();
// });
// app.set('etag', false);

app.use((req, res, next) => {
  res.header('Cache-Control', 'no-store');
  next();
});
const PORT = process.env.PORT;

app.use("/api/auth", authRouter);
app.use("/api/forum",checkLogin, forumRouter);
app.use("/api/faculty",checkLogin, facultyRouter);
app.use("/api/todo",checkLogin, todoRouter)
app.use("/api/chatbot", chatbotRouter)
app.use("/api/mail", mailRouter);
app.use("/api/job", jobRouter)

// app.get("/", checkLogin, (req, res)=>{
//     return res.status(200).json({ msg:"Hello World" })
// })




if (process.env.NODE_ENV != "development") {
  app.use(express.static(path.join(__dirname, "..", "client", "dist")));

  app.use("*name",(req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
  });
}

server.listen(PORT, ()=>{
    console.log("Listening On The PORT: ", PORT)
})