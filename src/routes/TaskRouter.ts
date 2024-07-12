import { Router } from "express";

import {
  createTask,
  readTask,
  updateTask,
  deleteTask,
  stripeTask
} from "../controllers/TaskController";


const router = Router();

router.get("/tarefa/:id", readTask);
router.post("/tarefa/create", createTask);
router.get("/tarefas", stripeTask)
router.put("/tarefa/:id", updateTask);
router.delete("/tarefa/:id", deleteTask);


export { router as RouterTask };