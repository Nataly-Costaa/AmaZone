// src/routes/auth.routes.js
import express from 'express';
import AuthController from '../controller/auth.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { loginSchema } from '../schemas/user.schema.js';

const authRouter = express.Router();

// A rota de login também deve validar os dados de entrada
authRouter.post("/login", validate(loginSchema), AuthController.login);

export default authRouter;