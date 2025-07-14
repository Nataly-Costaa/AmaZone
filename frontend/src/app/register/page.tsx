"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { registerSchema, RegisterFormData } from "@/lib/schemas";
import authAPI from "@/lib/api";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError("");
      setSuccess(false);

      await authAPI.register(data);
      setSuccess(true); // Mostrar mensagem de sucesso

      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push("/");
      }, 3000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro no cadastro");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-8 w-8 border-4 border-[#22A66B] border-t-transparent rounded-full"></div>
          <p className="text-[#22A66B] font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col lg:flex-row h-auto lg:h-screen">
      <section className="bg-[#22A66B] text-white py-12 px-6 w-full lg:w-185 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-evenly w-80 h-50">
          <h1 className="text-4xl text-center">
            Ama<span className="text-[#784545]">Zone</span>
          </h1>
          <hr className="w-70" />
          <p className="text-center w-52">
            Crie sua conta para explorar a natureza conosco.
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 cursor-pointer font-bold text-[#784545] underline hover:text-[#673200] transition-colors duration-200"
        >
          Já tem conta? Faça login
        </button>
      </section>

      <section className="flex flex-col items-center justify-center w-full h-auto lg:h-screen px-4 py-8 lg:px-0 lg:py-0">
        <div>
          <h2 className="text-[#22a66b] text-2xl font-bold h-20 flex items-center justify-center">
            Cadastro
          </h2>

          <form
            className="flex flex-col items-center justify-around h-[26rem] w-90"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mensagem de sucesso */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                <p className="text-green-800 font-semibold">
                  Cadastro realizado com sucesso! Redirecionando para login...
                </p>
              </div>
            )}

            {/* Nome */}
            <div className="flex flex-col w-full max-w-md mb-4">
              <label htmlFor="name" className="text-[#22a66b] mb-1">
                Nome:
              </label>

              <div className="relative w-full">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#22a66b] w-5 h-5" />

                <input
                  {...register("name")}
                  type="text"
                  className="bg-[#dadada] w-full h-10 pl-10 pr-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#22A66B] text-black"
                  placeholder="Seu nome"
                  disabled={isLoading || success}
                />
              </div>

              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* E-mail */}
            <div className="flex flex-col w-full max-w-md mb-4">
              <label htmlFor="email" className="text-[#22a66b] mb-1">
                E-mail:
              </label>
              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#22a66b] w-5 h-5" />
                <input
                  {...register("email")}
                  type="email"
                  className="bg-[#dadada] w-full h-10 pl-10 pr-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#22A66B] text-black"
                  placeholder="email@exemplo.com"
                  disabled={isLoading || success}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Senha */}
            <div className="flex flex-col w-full max-w-md mb-4">
              <label htmlFor="password" className="text-[#22a66b]">
                Senha:
              </label>
              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#22a66b] w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading || success}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#22a66b]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#22a66b]" />
                  )}
                </button>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="bg-[#dadada] w-full h-10 pl-10 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#22A66B] text-black"
                  placeholder="********"
                  disabled={isLoading || success}
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirmar Senha */}
            <div className="flex flex-col w-full max-w-md mb-4">
              <label htmlFor="confirmPassword" className="text-[#22a66b]">
                Confirmar senha:
              </label>
              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#22a66b] w-5 h-5" />
                <input
                  {...register("confirmPassword")}
                  type={showPassword ? "text" : "password"}
                  className="bg-[#dadada] w-full h-10 pl-10 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#22A66B] text-black"
                  placeholder="********"
                  disabled={isLoading || success}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Botão */}
            <button
              className="bg-[#22A66B] text-white w-34 h-9 rounded-full hover:bg-[#1e8f5d] cursor-pointer transition-colors duration-200"
              type="submit"
              disabled={isLoading || success}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Cadastrando...
                </div>
              ) : (
                "Cadastrar"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
