"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";
import { loginShema, LoginFormData } from "@/lib/schemas";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const { user, login, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !authLoading && user?.email) {
      router.push("/user/home");
    }
  }, [mounted, authLoading, user, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginShema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError("");

      await login(data);
      router.push("/user/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro no login");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-8 w-8 border-4 border-[#22A66B] border-t-transparent rounded-full"></div>
          <p className="text-[#22A66B] font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (user?.email) {
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
        <div className=" flex flex-col items-center justify-evenly w-80 h-50">
          <h1 className="text-4xl text-center">
            Ama<span className="text-[#784545]">Zone</span>
          </h1>
          <hr className="w-70" />
          <p className="text-center w-52">
            Boas-vindas ao AmaZone – onde a natureza é protagonista.
          </p>
        </div>

        <button
          onClick={() => router.push("/register")}
          className="mt-6 cursor-pointer font-bold text-[#784545] underline hover:text-[#673200] transition-colors duration-200"
        >
          Cadastre-se
        </button>
      </section>

      <section className="flex flex-col items-center justify-center w-full h-auto lg:h-screen px-4 py-8 lg:px-0 lg:py-0">
        <div className="h-100">
          <h2 className="text-[#22a66b] text-2xl font-bold h-20 flex items-center justify-center">
            Login
          </h2>

          <form
            className="flex flex-col items-center justify-around h-80 w-95"
            onSubmit={handleSubmit(onSubmit)}
          >
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="m1-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col w-full max-w-md mb-4">
              <label htmlFor="email" className="text-[#22a66b] mb-1">
                E-mail:
              </label>

              <div className="relative w-full">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#22a66b] w-5 h-5" />

                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="bg-[#dadada] w-95 h-10 pl-10 pr-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#22A66B] text-black"
                  placeholder="user@example.com"
                  disabled={isLoading}
                />
              </div>

              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-full max-w-md mb-4">
              {/* Password */}
              <label htmlFor="password" className="text-[#22a66b]">
                Senha:
              </label>

              <div className="relative w-full">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#22a66b] w-5 h-5" />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
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
                  className="bg-[#dadada] w-95 h-10 pl-10 pr-10 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#22A66B] text-black"
                  placeholder="********"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button de submit */}
            <button
              className="bg-[#22A66B] text-white w-34 h-9 rounded-full hover:bg-[#1e8f5d] cursor-pointer transition-colors duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>

        <div className="bg-[#f0fdf4] border border-[#22A66B] rounded-lg p-3 shadow-md max-w-xs w-48 mx-auto  text-sm text-[#155e3c] lg:ml-auto lg:mr-8">
          <p className="font-semibold text-[#22A66B] mb-2 text-center lg:text-left">
            🔐 Credenciais de Teste
          </p>

          <div className="space-y-1 text-center lg:text-left">
            <p>
              <span className="font-medium">E-mail:</span> nome@email.com
            </p>
            <p>
              <span className="font-medium">Senha:</span> senha123
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
