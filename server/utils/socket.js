import { Server } from "socket.io";
import http from "http";
import express from "express"

const app = express();

const server = http.createServer(app)

const io = new Server(server, {
    transports: ["websocket"],
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"]
    },
    withCredentials: true
})


const userSocketMap = {};

export const getReceiverSocketId = (userId)=>{
    console.log("Socket Id: ", userSocketMap[userId]);
    return userSocketMap[userId]
}

io.on("connection", (socket)=>{
    console.log("An User Connected: ", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id
    }
    console.log(userSocketMap);
    socket.on("disconnect", ()=>{
        delete userSocketMap[userId];
        console.log("An User Disconnected", socket.id);
    })
})

export { io, app, server }