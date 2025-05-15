"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Email from "../../components/Email";
import Senha from "../../components/Senha";
import Titulo from "../../components/Titulo";

function Cadastro() {
  const router = useRouter();
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [carregando, setCarregando] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setCarregando(true);

    if (
      nome.trim() === "" ||
      telefone.trim() === "" ||
      senha.trim() === "" ||
      email.trim() === ""
    ) {
      setCarregando(false);
      return setMsg("Preencha todos os campos!");
    }

    if (telefone.replace(/\D/g, "").length < 11) {
      setCarregando(false);
      return setMsg("Telefone incompleto!");
    }

    if (senha.length < 8) {
      setCarregando(false);
      return setMsg("Senha muito curta!");
    }

    const usuario = { nome, email, senha, telefone };

    const delayMsg = setTimeout(() => {
      setMsg("Iniciando serviço, pode levar até 1 min...");
    }, 3000);

    try {
      const resposta = await axios.post(`${apiURL}/usuarios`, usuario);

      clearTimeout(delayMsg);
      setCarregando(false);
      setMsg("");

      const { email } = resposta.data.usuario;
      localStorage.setItem("userEmail", email);

      const { nome } = resposta.data.usuario;
      localStorage.setItem("userNome", nome);

      const { telefone } = resposta.data.usuario;
      localStorage.setItem("userTel", telefone);

      router.push("/interfacePrincipal");
    } catch (erro) {
      clearTimeout(delayMsg);
      setCarregando(false);
      setMsg(
        erro.response?.data?.message || "Erro ao cadastrar. Tente novamente."
      );
    }
  };

  const formatarTelefone = (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    if (valor.length <= 2) {
      setTelefone(valor);
    } else if (valor.length <= 6) {
      setTelefone(`(${valor.slice(0, 2)}) ${valor.slice(2)}`);
    } else {
      setTelefone(
        `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7, 11)}`
      );
    }
  };

  return (
    <div className="flex flex-col text-black items-center justify-center mt-5 md:mt-10">
      <Titulo>Cadastrar</Titulo>
      <form onSubmit={handleSubmit} className="w-full max-w-md px-4">
        <div className="pb-8 mt-3">
          <div></div>
          <p className=" pt-4">Nome:</p>
          <input
            type="text"
            placeholder="Inserir nome"
            maxLength="30"
            className="border border-gray-800 rounded px-3 py-2 w-full mt-1"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          ></input>
          <Email setEmail={setEmail} email={email}></Email>
          <Senha setSenha={setSenha} senha={senha}></Senha>

          <p className=" pt-4">Telefone:</p>
          <input
            type="text"
            value={telefone}
            onChange={formatarTelefone}
            placeholder="(00) 00000-0000"
            maxLength="15"
            className="border border-gray-800 rounded px-3 py-2 w-full mt-1"
            title="Formato: (99) 99999-9999"
          />
          <div className="flex items-center justify-center mt-10 space-x-10">
            <button
              onClick={() => {
                router.push("/login");
              }}
              type="button"
              className=" bg-gray-300 py-2 px-4 rounded hover:text-gray-800"
            >
              Ir para login
            </button>
            <button
              type="submit"
              className="bg-green-500 py-2 px-4 rounded hover:text-gray-800"
              disabled={carregando}
            >
              {carregando ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Carregando...</span>
                </div>
              ) : (
                "Cadastrar"
              )}
            </button>
          </div>
        </div>
      </form>
      {msg && <div className="text-red-700 mb-5 font-semibold">{msg}</div>}
    </div>
  );
}

export default Cadastro;
