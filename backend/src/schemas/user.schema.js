import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, "O nome é obrigatório."),
  email: z.string().email("Forneça um e-mail válido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const loginSchema = z.object({
  email: z.string().email("O e-mail é obrigatório."),
  password: z.string().nonempty("A senha é obrigatória."),
});