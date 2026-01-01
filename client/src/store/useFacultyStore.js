import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import { useAuthStore } from "./useAuthStore";

export const useFacultyStore = create((set, get) => ({
  faculties: [],
  facultiesCopy: [],
  facultiesCopy2: [],
  facultiesCopy3: [],
  facultiesCopy4: [],
  selectedDropdown: {
    Department: "Select",
    Designation: "Select",
    Joining_Date: "Select",
  },
  getFaculties: async () => {
    try {
      const response = await axiosInstance.get("/faculty/getfaculties");
      set({ faculties: response.data.faculties });
      set({ facultiesCopy: response.data.faculties });
      set({ facultiesCopy2: response.data.faculties });
      set({ facultiesCopy3: [{ Department: "None", Designation: "None", Joining_Date: "None"}, ...response.data.faculties]});
      set({ facultiesCopy4: response.data.faculties });
    } catch (e) {
      // console.log(e);
    }
  },

  setFaculties: async (faculties) => {
    try {
      set({ faculties });
      set({ facultiesCopy: faculties });
      set({ facultiesCopy3: faculties });
      set({ facultiesCopy2: faculties });
      set({ facultiesCopy4: faculties });
      const response = await axiosInstance.post("/faculty/upload", {
        faculties,
      });
      // console.log(response.data.msg);
    } catch (e) {
      // console.log(e);
    }
  },

  search: async (text) => {
    // console.log("Text: ", text);
    get().removeFilters();
    const filteredFaculties = get().facultiesCopy.filter((faculty) => {
      const splitName = faculty.Name.split(" ");
      let check = false;
      for (const elem of splitName) {
        elem.toLowerCase().startsWith(text.toLowerCase()) && (check = true);
      }
      if (check) {
        return faculty;
      }
    });

    // console.log(filteredFaculties);

    set({ faculties: filteredFaculties });
  },

  setSelectedDropdown: async (data) => {
    set({ selectedDropdown: data });
  },

  applyFilters : async()=>{
    const facultiesCopy = get().facultiesCopy2;
    const selectedDropdown = get().selectedDropdown;


    const filteredFaculties = facultiesCopy.filter((element, index)=>{
        return Object.entries(selectedDropdown).every(([key, value])=>{
          return value=="Select"||value=="None" ? true :  element[key] == value;
        })
    })
    
    // console.log(filteredFaculties);
    set({ faculties: filteredFaculties });
  },

  removeFilters: async()=>{
    set({selectedDropdown: {
        Department: "Select",
        Designation: "Select",
        Joining_Date: "Select",
      }});
    set({ faculties: get().facultiesCopy4 })
  }
}));
