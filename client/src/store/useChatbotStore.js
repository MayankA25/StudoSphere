import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useChatbotStore = create((set, get)=>({
    message: "",
    prevChat: [],
    length: 0,
    sending: false,
    getChat: async()=>{
        try{
            const response = await axiosInstance.get("/chatbot/getchat");
            // console.log(response.data);
            set({ prevChat: response.data, length: response.data.length });
        }catch(e){  
            // console.log(e)
        }
    },
    sendPrompt: async(prompt)=>{
        set({ message: "", sending: true })
        const { user } = useAuthStore.getState();
        const prevChatCopy = [...get().prevChat];
        prevChatCopy.push({ userId: user.user._id, prompt: prompt, response: "" })
        set({ prevChat: prevChatCopy, length: get().length + 1 })
        try{
            const response = await axiosInstance.post("/chatbot/getresponse", {
                prompt
            });
        }catch(e){
            // console.log(e);
            toast.error("It Works According to Its Mood. Its Free API :)")
        }finally{
            set({ sending: false })
        }
        // // console.log(response);
    },

    subscribeToChatbot: async()=>{
        const { socket } = useAuthStore.getState();
        socket.on("token", (token)=>{
            
            const prevChatCopy = [...get().prevChat];
            // console.log(prevChatCopy)
            // console.log(token);
            let message = get().message;
            message += token;
            prevChatCopy.splice(get().length-1, 1, {...prevChatCopy[get().length-1], response: message});

            set({ message: message, prevChat: prevChatCopy })
        })
    },

    unsubscribeChatbot: async()=>{
        const { socket } = useAuthStore.getState();
        socket.off("token");
    }
}))