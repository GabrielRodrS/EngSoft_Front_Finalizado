"use client";

import { Bell, Album, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import GuiaNotf from "./GuiaNotf";

export default function Interface({ children }) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [notf, setNotf] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    if (notf) {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        console.error("Usuário não encontrado.");
        return;
      }

      axios
        .get(`${apiURL}/notificacoes/mostrar?userEmail=${userEmail}`)
        .then((response) => {
          console.log("Notificações recebidas:", response.data);
          setNotificacoes(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar notificações:", error);
        });
    }
  }, [notf]);

  return (
    <div
      className="bg-white flex flex-col min-h-screen"
      onClick={() => {
        if (notf == true) {
          setNotf(false);
        }
      }}
    >
      <header className="bg-green-400 h-20 flex items-center justify-between px-4 md:px-5 text-blue-950 font-bold text-lg">
        <button
          onClick={() => router.push("/interfacePrincipal")}
          className="hover:text-black"
        >
          <img src="/img/Logo.png" alt="Logo" height={60} width={60} />
        </button>

        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          <span className="block w-6 h-0.5 bg-blue-950"></span>
          <span className="block w-6 h-0.5 bg-blue-950"></span>
          <span className="block w-6 h-0.5 bg-blue-950"></span>
        </button>

        <nav
          className={`flex-col md:flex-row md:flex items-center absolute md:static top-20 left-0 right-0 bg-green-400 md:bg-transparent
      md:space-x-6
      ${menuAberto ? "flex" : "hidden"} md:flex
      z-50
    `}
        >
          <button
            className="flex items-center px-4 py-3 hover:text-black border-b md:border-none border-green-300 md:border-0 w-full md:w-auto"
            onClick={() => {
              router.push("./quadro");
              setMenuAberto(false);
            }}
          >
            <Calendar className="mr-2" /> Quadro de horários
          </button>

          <button
            className="flex items-center px-4 py-3 hover:text-black border-b md:border-none border-green-300 md:border-0 w-full md:w-auto"
            onClick={() => {
              router.push("/historico");
              setMenuAberto(false);
            }}
          >
            <Album className="mr-2" /> Histórico de horários
          </button>

          <button
            className="px-4 py-3 hover:text-black w-full md:w-auto"
            onClick={() => {
              setNotf(true);
              setMenuAberto(false);
            }}
          >
            <Bell />
          </button>

          <button
            onClick={() => {
              router.push("/perfil");
              setMenuAberto(false);
            }}
            className="flex items-center px-4 py-3 hover:text-black w-full md:w-auto"
          >
            <div className="flex flex-col items-center">
              <img
                src="/img/fotoperfil.png"
                alt="perfil"
                width={30}
                height={30}
                className="mr-1"
              />
              <span>Perfil</span>
            </div>
          </button>
        </nav>
      </header>

      <div className="flex flex-row flex-1 h-[calc(100vh-5rem)] text-black">
        <main className="flex-1 p-10 overflow-y-auto">{children}</main>
      </div>

      {notf && <GuiaNotf notificacoes={notificacoes} />}
    </div>
  );
}
