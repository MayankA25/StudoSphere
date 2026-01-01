import { Message } from "../models/Message.js"
import { User } from "../models/User.js";
import classifyText from "../utils/classifyText.js";
import { io } from "../utils/socket.js";

export const getMessages = async (req,res)=>{
    try{
        const messages = await Message.find();
        return res.status(200).json({ messages })
    }catch(e){
        return res.status(400).json({ msg: "Some Error Occured While Loading Messages" })
    }
}

export const sendMessage = async(req, res)=>{
    const { senderId, text, image } = req.body;
    console.log(req.session.passport.user);
    // console.log(category)
    try{
        const message = new Message({
            senderId, 
            senderProfilePic: req.session.passport.user.user.profilePic || "",
            senderName: req.session.passport.user.user.username,
            text, 
            category:"",
            image
        })
        const savedMessage = await message.save();
        io.emit("broadcastMessage", savedMessage)
        const category = await classifyText(text);
        const foundMessage = await Message.findByIdAndUpdate(savedMessage._id, {$set: { category }}, {new: true});
        console.log(foundMessage)
        io.emit("broadcastMessage", foundMessage);
        return res.status(200).json({ savedMessage: foundMessage });
    }catch(e){
        return res.status(400).json({ msg: "Error While Sending Message" })
    }
}

export const getUserInfo = async(req, res)=>{
    const { senderId } = req.body;
    console.log(senderId)
    const foundUser = await User.findById(senderId)

    if(!foundUser){
        return res.status(400).json({ msg: "User Does Not Exists" })
    }

    return res.status(200).json({ user: foundUser })
}

export const editMessage = async(req, res)=>{
    const { messageId, text } = req.body;
    console.log(messageId, text)
    const foundMessage = await Message.findById(messageId);
    console.log(foundMessage)
    if(!foundMessage) return res.status(500).json({ msg: "Message Not Found" });

    const updated = {
        senderId: foundMessage.senderId,
        senderProfilePic: foundMessage.senderProfilePic,
        senderName: foundMessage.senderName, 
        text: text,
        category: "",
        image: foundMessage.image
    }
    
    io.emit("editMessage", { updated, id: foundMessage._id });
    const category = await classifyText(text);
    updated.category = category;
    io.emit("editMessage", { updated, id: foundMessage._id })
    const updatedMessage = await Message.findByIdAndUpdate(messageId, updated, {new: true});
    console.log(updatedMessage)

    return res.status(200).json({ msg:"Message Updated Successfully!", updatedMessage })

}


export const deleteMessage = async(req, res)=>{
    const { messageId } = req.query;
    io.emit("deleteMessage", messageId);
    try{
        await Message.findByIdAndDelete(messageId);
        return res.status(200).json({ msg: "Message Deleted Successfully" });
    }catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}


export const addReply = async(req, res)=>{
    const { messageId, replies } = req.body;
    try{
        io.emit("reply", { messageId, replies })
        const updatedMessage = await Message.findByIdAndUpdate(messageId, {$set: { replies: replies }}, {new: true});
        return res.status(200).json({updatedMessage});
    }catch(e){
        console.log(e);
        return res.status(400).json({ msg: "Error While Replying" })
    }
}