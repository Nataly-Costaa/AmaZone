import app from './server.js';
import dotenv from "dotenv";

// lendo o arquivo .env
dotenv.config();

// informando que a porta será a passada no arquivo .env ou 3000
const PORT = process.env.BACKEND_PORT || 3001;

app.listen(PORT,() => { // RODA A PORTA 3000 NO SERVIDOR
    console.log(`Servidor rodando em http://localhost:${PORT}`,);
    console.log(`📋 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`);

});

export default app;