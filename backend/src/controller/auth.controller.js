import prisma from "../prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  async register(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email e senha são obrigatórios" });
      }

      // Verificar se usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar usuário
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      // Gerar token
      const token = jwt.sign(
        { userId: user.id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Configurar cookie
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      const response = {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error("Erro no registro:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        user: { id: user.id, email: user.email },
        token,
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async me(req, res) {
    res.json({ user: req.user });
  }

  logout(req, res) {
    res.clearCookie("authToken");
    res.json({ message: "Logout realizado com sucesso" });
  }
}

export default new AuthController();