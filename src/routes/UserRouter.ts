import { Router } from "express";
import { authAccess } from "../middlewares/authMiddleware";
import {
  readUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  stripeUser
} from "../controllers/UserController";



const router = Router();

router.post("/login", loginUser)
router.post("/usuario/create", createUser);

router.get("/usuarios", authAccess(['Admin']), stripeUser)
router.get("/usuario/:id", authAccess(['Admin', 'Usuario']),readUser);
router.put("/usuario/:id", authAccess(['Admin', 'Usuario']), updateUser);
router.delete("/usuario/:id",  authAccess(['Admin']), deleteUser);

export { router as RouterUser };
