import { create } from "zustand"

export const useNavStore = create((set, get)=>({
    path: "/",


    setPath: async(path)=>{
        set({ path })
    }
}))