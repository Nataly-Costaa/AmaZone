// src/routes/auth.routes.js
import { Router } from 'express';
import AuthController from '../controller/auth.controller.js';
import { authenticateToken } from "../middlewares/auth.middleware.js"


const authRouter = Router();

// A rota de login também deve validar os dados de entrada
authRouter.post("/login", AuthController.login);

// POST /auth/register
authRouter.post("/register", AuthController.register);

// GET /auth/me
authRouter.get("/me", authenticateToken, AuthController.me);

// POST /auth/logout
authRouter.post("/logout", AuthController.logout);

export default authRouter;