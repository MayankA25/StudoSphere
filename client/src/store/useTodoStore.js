import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useTodoStore = create((set, get) => ({
  todos: [],
  todosCopy: [],
  number: 1,
  shareNumber: 1,
  details: {
    title: "",
    description: "",
    tags: [],
    startDate: '',
    deadline: "",
  },
  shareTodoId: null,
  names: [],
  edit: true,

  getTodos: async () => {
    try {
      const repsonse = await axiosInstance.get("/todo/gettodos");
      // console.log(repsonse.data.todos);
      set({ todos: repsonse.data.todos });
      set({ todosCopy: repsonse.data.todos });
    } catch (e) {
      // console.log(e);
    }
  },

  setEdit: async(val)=>{
    set({ edit: val })
  },

  addTodo: async (val) => {
    // // console.log(get().details);
    const todosCopy = [...get().todos];
    const detailsCopy = { ...get().details };
    const newDetails = {
      ...detailsCopy,
      tags: detailsCopy.tags.join(" "),
      sharedBy: "",
      sharedTo: [],
    };
    // console.log(newDetails);
    // todosCopy.unshift(newDetails);
    // set({ todos: todosCopy });
    // set({ todosCopy });
    const now = new Date(Date.now() - 60000);
    const startDate = new Date(get().details.startDate || val);
    const deadline = new Date(get().details.deadline);
    if (deadline <= now || deadline <= now || startDate < now)
    return toast.error("Deadline Must Be Valid")

    try {
      const repsonse = await axiosInstance.post("/todo/addtodo", {
        title: get().details.title,
        description: get().details.description,
        tags: get().details.tags.join(" "),
        startDate:startDate.toISOString() ,
        deadline: deadline.toISOString(),
      });
      // console.log(repsonse.data.savedNote);
      todosCopy.unshift(repsonse.data.savedNote);
      set({ todos: todosCopy, todosCopy: todosCopy });
      toast.success("ToDo Added Successfully");
    } catch (e) {
      // console.log(e);
      toast.error(e.response.data.msg)
    }
  },

  editTodo: async () => {
    // console.log("Inside Edit");
    const { _id, title, description, tags, startDate, deadline } = get().details;
    const now = new Date(Date.now()-60000);
    const startDate2 = new Date(startDate).toISOString();
    const deadline2 = new Date(deadline).toISOString();
    // console.log(startDate2, deadline2);
    // console.log(deadline2 < startDate2)
    if (deadline2 < startDate2) return toast.error("Deadline Must Be Valid")
    const todosCopy = [...get().todos];
    const index = todosCopy.findIndex((element) => {
      return element._id === _id;
    });
    const completed = todosCopy.at(index).completed;
    // console.log(index);
    todosCopy.splice(index, 1, {
      ...get().details,
      tags: tags.join(" "),
      completed,
      _id: _id,
      sharedBy: "",
      sharedTo: []
    });
    set({ todos: todosCopy });
    try {
      const response = await axiosInstance.patch("/todo/edittodo", {
        id: _id,
        title,
        description,
        tags: tags.join(" "),
        startDate: startDate2,
        deadline: deadline2,
      });
      // console.log(response.data.editedTodo);
      toast.success("ToDo Updated Successfully");
    } catch (e) {
      // console.log(e);
      toast.error(e.response.data.msg)
    }
  },

  deleteTodo: async (todoId) => {
    // console.log(get().todos);
    const todosCopy = [...get().todos];
    const newTodos = todosCopy.filter((todo, index) => {
      return todo._id !== todoId;
    });
    // console.log(newTodos);
    set({ todos: newTodos });
    try {
      const response = await axiosInstance.delete("/todo/deletetodo", {
        params: {
          id: todoId,
        },
      });
      // console.log(response.data.msg);
      toast.success(response.data.msg);
    } catch (e) {
      // console.log(e);
    }
  },

  setShareTodoId: (id) => {
    set({ shareTodoId: id });
  },

  shareTodo: async (id) => {
    // console.log(id);
    const { user } = useAuthStore.getState();
    const todosCopy = [...get().todos];
    const namesCopy = [...get().names];
    if(namesCopy.includes(user.user.email)){
      return toast.error("Cannot Shared To The Assigner")
    }
    const foundIndex = todosCopy.findIndex((todo) => {
      return todo._id == id;
    });
    todosCopy[foundIndex].sharedBy = user.user.email;
    todosCopy[foundIndex].sharedTo.push(get().names);
    set({ todos: todosCopy });
    try {
      const response = await axiosInstance.patch("/todo/sharetodo", {
        id: id,
        sharedTo: namesCopy,
      });
      // console.log(response.data);
      toast.success("ToDo Shared Successfully!")
    } catch (e) {
      // console.log(e);
      toast.error(e.response.data.msg);
    }
  },

  markAsCompleted: async (id) => {
    const todosCopy = [...get().todos];
    const foundIndex = todosCopy.findIndex((element, index) => {
      return element._id == id;
    });
    todosCopy[foundIndex].completed = true;
    set({ todos: todosCopy });
    try {
      const response = await axiosInstance.patch("/todo/completetodo", {
        id,
      });
      // console.log(response.data);
    } catch (e) {
      // console.log(e);
    }
  },
  markAsIncomplete: async (id) => {
    const todosCopy = [...get().todos];
    const foundIndex = todosCopy.findIndex((element, index) => {
      return element._id == id;
    });
    todosCopy[foundIndex].completed = false;
    set({ todos: todosCopy });
    try {
      const response = await axiosInstance.patch("/todo/uncompletetodo", {
        id,
      });
      // console.log(response.data);
    } catch (e) {
      // console.log(e);
    }
  },

  search: async (val) => {
    const todosCopy = [...get().todosCopy];
    const filteredTodos = todosCopy.filter((element, index) => {
      const splitTodos = element.title.split(" ");
      let check1 = false;
      let check2 = false;
      const tags = element.tags.split(" ");
      for (const title of splitTodos) {
        title.toLowerCase().startsWith(val.toLowerCase()) && (check1 = true);
      }
      for (const tag of tags) {
        tag.toLowerCase().startsWith(val.toLowerCase()) && (check2 = true);
      }
      if (check1 || check2) {
        return true;
      }
    });
    // console.log(filteredTodos);
    set({ todos: filteredTodos });
  },

  resetDetails: async (val) => {
    set({
      edit: val,
      details: {
        title: "",
        description: "",
        tags: [],
        deadline: "",
      },
      number: 1,
    });
  },

  // setDeadline: async(date, hour, number)=>{
  //   get().resetDetails();
  //   const d = new Date()
  //   const deadline = [];
  //   deadline.push(`${d.getFullYear()}`)
  //   let month = `${d.getMonth()+1}`
  //   if(month.length === 1){
  //     month = `0${d.getMonth()+1}`
  //   }
  //   deadline.push(month)
  //   deadline.push(`${date}`.length==1 ? `0${date}` : `${date}`);
  //   let newDeadline;
  //   if(number == 1){
  //     let newHour = `${hour}`;
  //     if(newHour.length == 1) newHour = `0${hour}`;
  //     newDeadline  = `${deadline.join("-")}T${newHour}:30`
  //   }
  //   if(number == 2){
  //     let newHour = `${hour+1}`;
  //     if(newHour.length == 1) newHour = `0${hour+1}`
  //     if(hour+1 == 24){ deadline.splice(2,1,date+1); newHour = "00"}
  //     newDeadline  = `${deadline.join("-")}T${newHour}:00`
  //   }
  //   set({ details: { ...get().details, deadline: newDeadline} })
  // },

  setDeadline: (deadline)=>{
    // console.log("Deadline: ", deadline);
    set({ details: { ...get().details, deadline: deadline } });
  },

  setDetails: async (details) => {
    // console.log(details.startDate)
    // const date = new Date();
    // const offset = date.getTimezoneOffset();
    // const absOffset = Math.abs(offset);
    // const offsetHours = parseInt(`${offset < 0 ? "-" : "+"}${Math.floor(absOffset/60)}`);
    // const offsetMinutes = parseInt(`${offset < 0 ? "-" : "+"}${absOffset%60}`);
    // // console.log(new Date(details.deadline).toISOString().split(".")[0]);
    // const deadline = new Date(details.deadline)
    // const startDate = new Date(details.startDate);
    // deadline.setHours(deadline.getHours() + offsetHours)
    // deadline.setMinutes(deadline.getMinutes() + offsetMinutes)
    // startDate.setHours(startDate.getHours() + offsetHours)
    // startDate.setMinutes(startDate.getMinutes() + offsetMinutes)
    // const newDeadline = deadline.toISOString().split(".")[0]
    // const newStartDate = startDate.toISOString().split(".")[0].slice(0,16)
    const newDetails = {
      ...details,
    };
    // console.log(newDetails);
    set({ edit: true, details: newDetails, number: details.tags.length });
  },

  changeHandler: (obj) => {
    // console.log(obj)
    const details = { ...get().details };
    set({ details: { ...details, ...obj } });
  },
  updateTags: (index, value) => {
    const details = get().details;
    const tags = [...get().details.tags];
    const tagsCopy = [...get().details.tags];
    tagsCopy.splice(index, 1, value.trim());
    // // console.log(
    //   tagsCopy.filter((tag) => {
    //     return tag !== "";
    //   })
    // );
    set({
      details: { ...details, tags: tagsCopy.filter((tag) => tag !== "") },
    });
  },
  setTags: (value) => {
    const details = get().details;
    // // console.log("Value oF Tags: ", value)
    set({ details: { ...details, tags: value } });
  },
  setNumber: (num) => {
    set({ number: num });
  },
  setShareNumber: (num) => {
    const { resetUsers } = useAuthStore.getState();
    resetUsers();

    set({ shareNumber: num });
  },
  updateName: (val, index) => {
    const { search } = useAuthStore.getState();
    // console.log("Value: ", val);
    const names = [...get().names];
    names.splice(index, 1, val);
    // console.log(names);
    set({ names: [...names] });
    search(val);
  },
  setNames: (newNames) => {
    set({ names: newNames });
  },
  addToCalendar: async(id)=>{
    try{ 
      const response = await axiosInstance.post("/todo/addtocalendar", {
        id: id
      });
      // console.log(response.data);
      toast.success("Added To Your Calendar");
    }catch(e){
      // // console.log(e);
      toast.error("Error While Adding Todo In Google Calendar");
    }
  }
}));
