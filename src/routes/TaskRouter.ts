import { Router } from "express";

import {
  createTask,
  readTask,
  updateTask,
  deleteTask,
} from "../controllers/TaskController";


const router = Router();

router.get("/tarefa/:id", readTask);
router.post("/tarefa/create", createTask);
router.put("/tarefa/:id", updateTask);
router.delete("/tarefa/:id", deleteTask);


export { router as RouterTask };