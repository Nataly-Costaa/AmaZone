import { z } from "zod";

//Schema para login
export const loginShema = z.object({
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
        .string()
        .min(1, "Senha é obrigatória")
        .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

// Schema para registro
export const registerSchema = z
    .object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
        password: z
            .string()
            .min(1, "Senha é obrigatória")
            .min(6, "Senha deve ter pelo menos 6 caracteres"),
        confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Senha não coincidem",
        path: ["confirmPassword"],
    });

// Tipos inferidos dos schemas
export type LoginFormData = z.infer<typeof loginShema>;
export type RegisterFormData = z.infer<typeof registerSchema>