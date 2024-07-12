import { Router } from "express";

import {
  readUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} from "../controllers/UserController";



const router = Router();

router.post("/login", loginUser)

router.post("/usuario/create", createUser);
router.get("/usuario/:id", readUser);
router.put("/usuario/:id",  updateUser);
router.delete("/usuario/:id",  deleteUser);

export { router as RouterUser };
