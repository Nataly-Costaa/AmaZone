import prisma from "../prisma.js";

class UserService {
  async findUserByEmail(email) {
    try {
      // Usa o método 'findUnique' do Prisma para buscar um usuário
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário por e-mail:", error);
      // Lança um erro para ser tratado pelo controller
      throw new Error("Erro no serviço ao buscar usuário.");
    }
  }

  async getUser() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return users;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro interno do sistema" });
    }
  }

  async criaUser(data) {
    const novoUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
    return novoUser;
  }

  async updateUser(id, data) {
    const userUpdate = await prisma.user.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        updatedAt: new Date(),
      },
    });

    return userUpdate;
  }

  async stats(req, res) {
    try {
      const totalUsers = await prisma.user.count();
      const adminUsers = await prisma.user.count({ where: { role: "ADMIN" } });
      const regularUsers = await prisma.user.count({ where: { role: "USER" } });

      res.status(200).json({ stats: { totalUsers, adminUsers, regularUsers } });
    } catch (error) {
      console.error("Erro ao buscar estatísticas: ", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async deletaUser(req, res) {
    try {
      const { id } = req.params;

      if (req.user?.id === id) {
        return res.status(400).json({ error: "Não é possível deletar a si mesmo." });
      }

      await prisma.user.delete({ where: { id } });
      res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar usuário: ", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export default new UserService();