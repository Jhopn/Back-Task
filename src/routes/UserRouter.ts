import { Router } from "express";

import {
  readUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController";

const router = Router();

router.post("/usuario/create", createUser);
router.get("/usuario/:id", readUser);
router.put("/usuario/:id", updateUser);
router.delete("/usuario/:id", deleteUser);

export { router as RouterUser };
