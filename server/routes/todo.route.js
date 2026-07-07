import { Router } from "express";
import { addToCalendar, addTodo, deleteTodo, editTodo, getTodos, markAsCompleted, markAsUncompleted, shareTodo } from "../controllers/todo.controller.js";
import { checkLogin } from "../middleware/checkLogin.js";

const todoRouter = Router();

todoRouter.get("/gettodos", checkLogin, getTodos);
todoRouter.post("/addtodo", checkLogin, addTodo);
todoRouter.patch("/edittodo", checkLogin, editTodo);
todoRouter.delete("/deletetodo",checkLogin, deleteTodo);
todoRouter.patch("/completetodo", checkLogin, markAsCompleted);
todoRouter.patch("/uncompletetodo", checkLogin, markAsUncompleted);
todoRouter.patch("/shareTodo",checkLogin, shareTodo);
todoRouter.post("/addtocalendar",checkLogin, addToCalendar);


export default todoRouter;


