"use client";

import Interface from "@/components/Interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Perfil() {
  const router = useRouter();
  const [userData, setUserData] = useState({ nome: "", tel: "", email: "" });
  const [isLoading, setIsLoading] = useState(true); // Para garantir atualização

  useEffect(() => {
    if (typeof window !== "undefined") {
      const nome = localStorage.getItem("userNome") || "";
      const tel = localStorage.getItem("userTel") || "";
      const email = localStorage.getItem("userEmail") || "";

      setUserData({ nome, tel, email });
      setIsLoading(false); // Finaliza carregamento
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userNome");
    localStorage.removeItem("userTel");
    router.replace("/login");
  };

  if (isLoading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  return (
    <Interface>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center w-full md:w-3/5 xl:w-2/5 rounded-md shadow-2xl p-3 py-5 px-4">
          <div className="w-full flex flex-col items-center">
            <Image
              src="/img/fotoperfil.png"
              alt="Perfil"
              width={90}
              height={90}
              className="rounded-full"
            />
          </div>

          <div className="w-full mt-5 space-y-5 md:space-x-0">
            {[
              { label: "Nome", key: "nome" },
              { label: "Telefone", key: "tel" },
              { label: "Email", key: "email" },
            ].map(({ label, key }) => (
              <div
                key={key}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-gray-300 pb-3"
              >
                <p className="font-semibold">{label}:</p>
                <p className="text-purple-900">{userData[key]}</p>
                <button
                  className="bg-amber-300 py-1 px-3 rounded-md text-gray-800 hover:text-white"
                  onClick={() => router.push(`/alterar${label}`)}
                >
                  {label === "Email" ? "Solicitar alteração" : "Alterar"}
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-row mt-5 space-x-5">
            <button
              className="bg-green-500 py-2 px-4 rounded-md text-white hover:bg-green-600"
              onClick={() => router.push("/alterarSenha")}
            >
              Alterar Senha
            </button>
            <button
              className="bg-red-500 py-2 px-4 rounded-md text-white hover:bg-red-600"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </Interface>
  );
}
