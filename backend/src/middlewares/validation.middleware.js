export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        // Formata os erros do Zod para uma resposta clara
        const errors = error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        return res.status(400).json({ message: "Dados inválidos.", errors });
    }
};

