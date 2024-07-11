import { Router } from "express";

import {
  createTask,
  readTask,
  updateTask,
  deleteTask,
} from "../controllers/TaskController";


const router = Router();

router.get("/atividade/:id", readTask);
router.post("/atividade", createTask);
router.put("/atividade/:id", updateTask);
router.delete("/atividade/:id", deleteTask);


export { router as RouterTask };