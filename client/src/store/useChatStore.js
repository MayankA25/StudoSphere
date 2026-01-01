import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [],
  messagesCopy: [],
  sending: false,
  input: true,
  filterMessages: async(category)=>{
    set({ messages: get().messagesCopy })
    if(category != "Lost and Found" && category !== "Career" && category !== "Campus Life") return set({ messages: get().messagesCopy, input: true })
    set({ input: false })
    const messagesCopy = [...get().messages]
    // console.log(category)
    const filteredMessages = messagesCopy.filter((element, index)=>{
      return element.category == category
    })
    // console.log(filteredMessages)
    set({ messages: filteredMessages })
  },

  getMessages: async () => {
    try {
      const response = await axiosInstance.get("/forum/messages");
      const messages = response.data.messages;
      // console.log("fetched messages: ", response.data.messages);
      set({ messages: response.data.messages });
      set({ messagesCopy: response.data.messages });
      // get().subscribeToMessages();
    } catch (e) {
      // console.log(e);
      toast.error("Cannot Get Messages When Logged Out!")
      set({ messages: [] });
    }
  },

  sendMessage: async ({ text, image }) => {
    set({ sending: true });
    // console.log(text, image);
    if (text.trim(" ").length === 0 && image.trim(" ").length === 0)
      return toast.error("Provide at least a message or an image");
    // console.log(useAuthStore.getState().user._id);
    const { user } = useAuthStore.getState();
    const senderId = user.user._id;
    try {
      const response = await axiosInstance.post("/forum/sendmessage", {
        senderId: senderId,
        text,
        image: image || "",
      });
      const savedMessage = response.data.savedMessage;
      // get().messages.push(savedMessage);
    } catch (e) {
      // console.log(e);
    } finally {
      set({ sending: false });
    }
  },

  addReply: async(messageId, reply)=>{
    const messagesCopy = [...get().messages];
    const foundIndex = messagesCopy.findIndex((element, index)=>element._id == messageId);
    messagesCopy[foundIndex].replies.push(reply);
    set({ messages: messagesCopy });
    try{
      const response = await axiosInstance.post("/forum/addreply", {
        messageId,
        replies: messagesCopy[foundIndex].replies
      });
      // console.log(response.data.updatedMessage)
    }catch(e){
      // console.log(e)
    }
  },

  deleteReply: async(messageId, replyIndex)=>{
    const messagesCopy = [...get().messages]
    // console.log("Delete: ", messageId)
    // console.log("Delete: ", messagesCopy)
    const foundIndex = messagesCopy.findIndex((element, index)=>element._id == messageId);
    // console.log(foundIndex)
    messagesCopy[foundIndex].replies.splice(replyIndex, 1);
    // console.log("Delete: ", messagesCopy)
    set({messages: messagesCopy});
    try{
      const response = await axiosInstance.post("/forum/addreply", {
        messageId,
        replies: messagesCopy[foundIndex].replies
      });
      // console.log(response.data.updatedMessage)
    }catch(e){
      // console.log(e)
    }

  },

  editText: async (messageId, text) => {
    // const messagesCopy = get().messagesCopy;
    // for(const message of messagesCopy){
    //     message._id == messageId ? message.text = text : null
    // }
    // set({ messages: messagesCopy });

    try {
      const response = await axiosInstance.patch("/forum/editmessage", {
        messageId,
        text: text,
      });
      // // console.log(response.data.updatedMessage)
      toast.success("Message Updated!");
    } catch (e) {
      // console.log(e);
      toast.error("Error While Updating Message");
    }
  },

  deleteText: async (messageId) => {
    // const messagesCopy = get().messagesCopy;
    // messagesCopy.forEach((message, index) => {
    //   message._id == messageId ? delete messagesCopy[index] : null;
    // });
    // set({ messages: messagesCopy });
    try {
      const response = await axiosInstance.delete("/forum/deletemessage", {
        params: {
          messageId: messageId,
        },
      });
      toast.success("Message Deleted Successfully");
    } catch (e) {
      toast.error("Cannot Delete Message");
    }
  },

  subscribeToMessages: () => {
    const { socket } = useAuthStore.getState();
    // console.log(socket);
    socket.on("broadcastMessage", (message) => {
      // console.log("Subscribe:", get().messages)
      // get().messages.push(message);
      const messagesCopy = [...get().messages];
      // console.log(messagesCopy)
      // console.log(message)
      const foundIndex = messagesCopy.findIndex((element, index)=>{
        // // console.log(element, message)
        return element._id == message._id});
      // console.log(foundIndex);
      if(foundIndex == -1){
        messagesCopy.push(message);
      }
      if(foundIndex != -1){
        messagesCopy.splice(foundIndex, 1, message)
      }
      set({ messages: messagesCopy, messagesCopy: messagesCopy })
      // get().getMessages();
      // get().unsubscribeToMessages();
    });
    socket.on("editMessage", ({ updated, id }) => {
      // console.log("Message Edited!");
      const messagesCopy = get().messagesCopy;
      for (const message of messagesCopy) {
        // message._id == id ? (message.text = updated.text) : null;
        if(message._id == id ){
          message.text = updated.text
          message.category = updated.category
        }
      }
      set({ messages: messagesCopy });
    });
    socket.on("deleteMessage", (messageId) => {
      const messagesCopy = [...get().messagesCopy];
      messagesCopy.forEach((message, index) => {
        message._id == messageId ? messagesCopy.splice(index, 1) : null;
      });
      // console.log("After Deleting: ", messagesCopy)
      set({ messages: messagesCopy });
      set({ messagesCopy: messagesCopy });
    });

    socket.on("reply", (obj)=>{
      const messagesCopy = [...get().messagesCopy];
      const index = messagesCopy.findIndex((element, index)=>obj.messageId == element._id)
      messagesCopy[index].replies = obj.replies;
      set({ messages: messagesCopy })
    })
  },

  unsubscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("broadcastMessage");
  },

  getUserInfo: async (senderId) => {
    // console.log(senderId);
    try {
      const response = await axiosInstance.post("/forum/getuser", {
        senderId: senderId,
      });
      const user = response.data.user;
      return user;
    } catch (e) {
      // console.log(e);
    }
  },
}));
