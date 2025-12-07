import express from 'express';
import { AuthController } from './auth.controller';
import { auth } from '../../middlewares/auth';
const router = express.Router()

// router.post("/login", auth("user", "admin"), AuthController.loginUser)
router.post("/login", AuthController.loginUser)

export const AuthRoute = router