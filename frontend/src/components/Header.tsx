"use client"

import Link from "next/link"
import { LogOut} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { logout } = useAuth(); // importa do contexto
  const router = useRouter();

  const handleLogout = async () => {
    await logout(); // chama o logout da API
    router.push("/login"); // redireciona para o login após logout
  };

  return (
    <header className="flex justify-between items-center px-4 bg-[#22a66b] h-16">
      <div className="w-38 h-16 flex justify-center items-center">
        <p className="text-2xl text-white">Ama<span className="text-[#784545]">Zone</span></p>
      </div>

      <nav className="w-120 flex justify-around text-white">
        <Link href="/user/home" className="hover:text-[#784545] transition-colors duration-200">Home</Link>
        <Link href="/user/animal" className="hover:text-[#784545] transition-colors duration-200">Animal</Link>
        <Link href="/user/plant" className="hover:text-[#784545] transition-colors duration-200">Plantas</Link>
        <Link href="#" className="hover:text-[#784545] transition-colors duration-200">Ameaças</Link>
        <button 
          onClick={handleLogout}
          className="hover:text-[#784545] transition-colors duration-200 cursor-pointer"
          title="Sair"
        >
          <LogOut />
        </button>
      </nav>
    </header>
  )
}
