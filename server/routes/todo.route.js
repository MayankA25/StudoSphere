import { Router } from "express";
import { addToCalendar, addTodo, deleteTodo, editTodo, getTodos, markAsCompleted, markAsUncompleted, shareTodo } from "../controllers/todo.controller.js";

const todoRouter = Router();

todoRouter.get("/gettodos", getTodos);
todoRouter.post("/addtodo", addTodo);
todoRouter.patch("/edittodo", editTodo);
todoRouter.delete("/deletetodo", deleteTodo);
todoRouter.patch("/completetodo", markAsCompleted);
todoRouter.patch("/uncompletetodo", markAsUncompleted);
todoRouter.patch("/shareTodo", shareTodo);
todoRouter.post("/addtocalendar", addToCalendar);


export default todoRouter;


