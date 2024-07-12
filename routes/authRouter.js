import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateLoginInput, validateUserInput } from "../middleware/validationMiddleware.js";

const router = Router()

router.post('/register', validateUserInput, register)
router.post('/login', validateLoginInput, login)

export default router;