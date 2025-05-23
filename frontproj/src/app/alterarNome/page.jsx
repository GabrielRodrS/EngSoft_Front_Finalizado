"use client";
import FundoFormulariosInt from "../../components/FundoFormulariosInt";
import Interface from "../../components/Interface";
import Titulo from "../../components/Titulo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

function AlterarNome() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [msg, setMsg] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const emailOn = localStorage.getItem("userEmail");
    if (!emailOn) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (!storedEmail) {
      setMsg("Você precisa estar logado!");

      return;
    }

    setEmail(storedEmail);
  }, []);

  const confirmar = async (e) => {
    e.preventDefault();

    if (!nome) {
      setMsg("Preencha seu nome!");
      return;
    }

    const usuario = { email, nome };

    try {
      const resposta = await axios.patch(`${apiURL}/usuarios/altnome`, usuario);

      const { nome: novoNome } = resposta.data.usuario;
      localStorage.setItem("userNome", novoNome);
      router.push("/perfil");
    } catch (erro) {
      setMsg(erro.response?.data?.message || "Informações inválidas!.");
    }
  };

  return (
    <Interface>
      <FundoFormulariosInt>
        <Titulo>Alterar Nome</Titulo>
        <div className="flex flex-col">
          <form onSubmit={confirmar}>
            <p className=" pt-10">Nome:</p>
            <input
              type="text"
              placeholder="Inserir nome"
              maxLength="30"
              className="border rounded px-3 py-2 w-full mt-1"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            ></input>
            <div className="flex flex-col items-center mb-5">
              <button
                type="submit"
                className="bg-green-400 py-2 px-4 rounded hover:text-gray-800 my-5"
                disabled={nome === ""}
              >
                Confirmar
              </button>
            </div>
          </form>
          {msg && <div className="text-red-800 mb-5 font-semibold">{msg}</div>}
        </div>
      </FundoFormulariosInt>
    </Interface>
  );
}

export default AlterarNome;
