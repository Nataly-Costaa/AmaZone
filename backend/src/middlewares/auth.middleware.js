import { verify } from 'jsonwebtoken';

function authMiddleware(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Token de autenticação não fornecido." });
    }

    // O formato do token é "Bearer SEU_TOKEN_AQUI"
    const [, token] = authorization.split(' ');

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const { userId } = decoded;

        // Adiciona o ID do usuário na requisição para uso posterior nos controllers
        req.userId = userId;

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
}

export default authMiddleware;