import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { uploadAttachments } from "../utils/uploadFile";

const BASE_URL = import.meta.env.MODE === "production" ?"https://studosphere-1.onrender.com" : "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
  user: null,
  socket: null,
  allUsers: [],
  allUsersCopy: [],
  skills: [],
  loggingIn: false,
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get("/auth/getusers");
      set({ allUsers: response.data.users });
      set({ allUsersCopy: response.data.users });
    } catch (e) {
      // console.log(e);
    }
  },
  search: async (val) => {
    const filteredUsers = get().allUsersCopy.filter((user, index)=>{
        return user.email.includes(val)
    });
    set({ allUsers: filteredUsers })
  },
  resetUsers: async()=>{
    set({ allUsers: get().allUsersCopy })
  },
  getUser: async () => {
    set({ loggingIn: true })
    try {
      const response = await axiosInstance.get("/auth/getUser");
      const user = response.data.user;
      // console.log("user: ", user);
      set({ user: user });
      user && get().connectSocket();
      user && toast.success("Logged In Successfully");
    } catch (e) {
      // console.log(e);
      if(e.response?.msg){
        toast.error(e.response.msg);
      }
    }finally{
      set({ loggingIn: false })
    }
  },

  login: async () => {
    try {
      window.location.href = import.meta.env.MODE === "production" ? "https://studosphere.onrender.com/api/auth/login": "http://localhost:5000/api/auth/login";
    } catch (e) {
      // console.log(e);
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      // console.log(response.data.msg);
      set({ user: null });
      get().disconnectSocket();
      toast.success("Logged Out Successfully");
    } catch (e) {
      // console.log(e);
    }
  },

  connectSocket: async () => {
    // console.log("Connecting...");
    const { user } = get();
    // console.log(get().socket);
    // console.log;
    if (!user || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      transports: ["websocket"],
      query: {
        userId: user.user._id,
      },
    });
    socket.connect();
    set({ socket });
  },

  disconnectSocket: async () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },

  handleSkillChange: async(index, val)=>{
    const skillsCopy = [...get().skills];
    const foundVal = skillsCopy.find((element, index)=>element.toLowerCase() == val.toLowerCase());
    // if(foundVal){
    //   skillsCopy.splice(index, 1, "");
    //   set({ skills: skillsCopy })
    //   return toast.error("Duplicate Skills")
    // } 
    skillsCopy.splice(index, 1, val.toUpperCase())
    // console.log(skillsCopy);
    set({ skills: skillsCopy });
  },
  checkDuplicateSkills: async (index, val) => {
    const skillsCopy = [...get().skills];
    const foundSkill = skillsCopy.find((skill, index1) => {
      if (index1 !== index) {
        return skill.toLowerCase() == val.toLowerCase();
      }
    });
    if (foundSkill) {
      skillsCopy.splice(index, 1, "");
      set({ skills: skillsCopy });
      // console.log(skillsCopy);
      toast.error("Duplicate Skills");
      return true;
    }
    return false;
  },
  removeSkill: async(index)=>{
    const skillsCopy = [...get().skills];
    skillsCopy.splice(index,1);
    // console.log(skillsCopy)
    set({ skills: skillsCopy })
  },
  handleSubmit: async(obj)=>{
    const user = {user: { ...get().user.user, ...obj, formSubmitted: true }};
    set({ user: user })
    try{
      const response = await axiosInstance.put("/auth/updateprofile", {
        user: user.user
      });
      // console.log("FE: ", response.data.updatedUser);
      set({ user: { user: response.data.updatedUser } });
    }catch(e){
      // console.log(e)
    }
  },
   uploadResume : async(e)=>{
     const file = e.target.files[0];
     const formData = new FormData();
     toast.promise(async()=>{
     formData.append("files", file);
      const urls = await uploadAttachments(formData);
      // console.log(urls)
      await get().handleSubmit({ resume: urls[0] })
    }, {
      loading: "Uploading..",
      error: "Error In Uploading"
    })
  },
  setProfileSkills: async(skills)=>{
    set({ skills: skills })
  }
})) ;
