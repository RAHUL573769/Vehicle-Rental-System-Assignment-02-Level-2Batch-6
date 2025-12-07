import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router()

// router.post("/login", auth("user", "admin"), AuthController.loginUser)
router.post("/login", AuthController.loginUser)
router.post("/signup", AuthController.signInUser)
export const AuthRoute = router