// src/middlewares/validation.middleware.js
import { ZodError } from 'zod'; 

export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        // Verifica se o erro é realmente do Zod
        if (error instanceof ZodError) {
            
            const errors = error.issues.map(issue => ({ 
                field: issue.path.join('.'),
                message: issue.message
            }));
            return res.status(400).json({ message: "Dados inválidos.", errors });
        }
        // Se for outro tipo de erro, passa para o próximo handler
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
};

