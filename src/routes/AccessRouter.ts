import { Router } from "express";
import { createAccess, stripeAccess, updateAccess, deleteAccess } from "../controllers/AccessController";
import { authAccess } from "../middlewares/authMiddleware";

const router = Router();

router.post('/acesso/create', createAccess)
router.get('/acessos', authAccess(['Admin']), stripeAccess)
router.put('/acesso/:id', authAccess(['Admin']), updateAccess)
router.delete('/acesso/:id', authAccess(['Admin']), deleteAccess)

export {router as RouterAccess}