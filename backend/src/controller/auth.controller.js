
import UserService from '../service/user.service.js';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { sign } = jwt;

class AuthController {
    async login(req, res) {
        const { email, password } = req.body;

        try {
            // 1. Encontrar o usuário pelo e-mail
            // (Você talvez precise criar um método 'findUserByEmail' no seu UserService)
            const user = await UserService.findUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: "Credenciais inválidas." }); // Usuário não encontrado
            }

            // 2. Comparar a senha enviada com a senha criptografada no banco
            const isPasswordCorrect = await compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Credenciais inválidas." }); // Senha incorreta
            }

            // 3. Gerar o token JWT
            const token = sign(
                { userId: user.id }, // Payload: informações a guardar no token
                process.env.JWT_SECRET, // Chave secreta do .env
                { expiresIn: '9h' } // Tempo de expiração do token
            );

            // 4. Enviar o token para o cliente
            return res.status(200).json({ token });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno no servidor." });
        }
    }
}

export default new AuthController();