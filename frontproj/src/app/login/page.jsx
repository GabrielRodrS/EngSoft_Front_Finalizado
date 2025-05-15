"use client";

import FundoFormularios from "../../components/FundoFormularios";
import { useRouter } from "next/navigation";
import Email from "../../components/Email";
import Senha from "../../components/Senha";
import Titulo from "../../components/Titulo";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [carregando, setCarregando] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setMsg("");

    if (senha.trim() === "" || email.trim() === "") {
      setMsg("Preencha os campos!");
      setCarregando(false);
      return;
    }

    const usuario = { email, senha };

    const delayMsg = setTimeout(() => {
      setMsg("Iniciando serviço, pode levar até 1 min...");
    }, 3000);

    try {
      const resposta = await axios.post(`${apiURL}/usuarios/login`, usuario);

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
        erro.response?.data?.message ||
          "Erro ao realizar login. Tente novamente."
      );
    }
  };

  return (
    <FundoFormularios>
      <div className="flex flex-col items-center justify-center text-black mt-5">
        <Titulo>Login</Titulo>

        <form onSubmit={handleSubmit} className="mt-2">
          <Email setEmail={setEmail} email={email}></Email>
          <Senha setSenha={setSenha} senha={senha}></Senha>
          <div className=" text-black space-x-10 flex justify-center items-center mb-10 mt-10 ">
            <button
              onClick={() => {
                router.push("/");
              }}
              type="button"
              className=" bg-gray-300 py-2 px-4 rounded hover:text-gray-800"
            >
              Ir para Cadastro
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
                "Login"
              )}
            </button>
          </div>
        </form>
        {msg && <div className="text-red-700 mb-5 font-semibold">{msg}</div>}
      </div>
    </FundoFormularios>
  );
}

export default Login;
