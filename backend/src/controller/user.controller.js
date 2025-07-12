import UserService from "../service/user.service.js"
import { hash } from 'bcryptjs';
class UserController {

    async getAllUsers(req, res) {
      try {
        const users = await UserService.getUser();
        return res.status(200).json(users);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar usuários" });
      }
    }
  
    async createUser(req, res) {
        const { name, email, password } = req.body;

        try {
            // A validação de campos faltando será feita pelo Zod

            // Criptografa a senha
            const passwordHash = await hash(password, 8);

            const userData = { name, email, password: passwordHash }; //  Usa a senha com hash
            await UserService.criaUser(userData);

            // Evita retornar a senha na resposta
            return res.status(201).json({ message: "Usuário criado com sucesso!" });
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            // Verifica se o erro é por e-mail duplicado (se o service/prisma retornar um erro específico)
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                return res.status(409).json({ message: "Este e-mail já está em uso." });
            }
            return res.status(500).json({ message: "Erro interno ao criar usuário" });
        }
    }
  
    async updateUser(req, res) {
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      try {
        if (!name || !email || !password) {
          return res.status(400).json({ message: "Campos obrigatórios faltando" });
        }
  
        const updatedUser = await UserService.updateUser(id, { name, email, password });
        return res.status(200).json(updatedUser);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao atualizar usuário" });
      }
    }
  
    async deleteUser(req, res) {
      const { id } = req.params;
  
      try {
        const deletedUser = await UserService.deletaUser(id);
        return res.status(200).json(deletedUser); 
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao deletar usuário" });
      }
    }
  }
  
  export default new UserController();