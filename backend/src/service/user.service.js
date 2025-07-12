import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true }
      });
      return users;
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
  
    async updateUser(id, data){
        const userUpdate = await prisma.user.update({
            where: {id: id},
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                updatedAt: new Date(),
            },
        })

        return userUpdate;
    }
  
   async deletaUser(id) {
    const userDeleted = await prisma.user.delete({
        where:{id:id}, 
    })
    return userDeleted;
   }
  }
  
  export default new UserService();
  

