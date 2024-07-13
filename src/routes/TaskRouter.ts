import { Router } from "express";
import { authAccess } from "../middlewares/authMiddleware";
import {
  createTask,
  readTask,
  updateTask,
  deleteTask,
  stripeTask
} from "../controllers/TaskController";


const router = Router();

router.get("/tarefa/:id", authAccess(['Admin', 'Usuario']), readTask);
router.post("/tarefa/create", authAccess(['Admin', 'Usuario']), createTask);
router.get("/tarefas/:userId", authAccess(['Admin', 'Usuario']), stripeTask)
router.put("/tarefa/:id", authAccess(['Admin', 'Usuario']), updateTask);
router.delete("/tarefa/:id", authAccess(['Admin', 'Usuario']), deleteTask);


export { router as RouterTask };