import 'dotenv/config';

import express from 'express';
import userRouter from "./src/routes/user.routes.js"
import animalRouter from "./src/routes/animal.Route.js";
import plantsRouter from "./src/routes/plants.routes.js"
import threatRouter from "./src/routes/threat.routes.js";
import curiosidadesRouter from './src/routes/curiosidades.routes.js';
import authRouter from './src/routes/auth.routes.js';
import { swaggerSpec, swaggerUiServe, swaggerUiSetup } from "./src/swagger.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter); 
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api-docs", swaggerUiServe, swaggerUiSetup(swaggerSpec));

// Rotas 
app.use('/animal', animalRouter);
app.use("/plantas", plantsRouter);
app.use("/threat", threatRouter);
app.use("/curiosidades", curiosidadesRouter);
app.use("/users", userRouter);

app.use("/{*any}", (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

export default app; //exporta o app para usar o express

