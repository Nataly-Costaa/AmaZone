import jwt from 'jsonwebtoken';
import prisma from "../prisma.js"

export const authenticateToken = async(req, res, next) => {
    try {
        const token = req.cookies.authToken;

        if(!token) {
            return res.status(401).json({ error: "Token não fornecido" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true },
        });

        if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Token inválido" });
    }
}