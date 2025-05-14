"use client";

import InputMask from "react-input-mask";
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

  return (
    <div className="flex flex-col text-black items-center justify-center mt-5">
      <Titulo>Cadastrar</Titulo>
      <form onSubmit={handleSubmit}>
        <div className="pb-8">
          <div></div>
          <p className=" pt-5">Nome:</p>
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

          <p className=" pt-5">Telefone:</p>
          <InputMask
            mask="(99) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="tel"
                placeholder="(00) 00000-0000"
                title="Formato: (99) 99999-9999"
                className="border border-gray-800 rounded px-3 py-2 w-full mt-1"
              />
            )}
          </InputMask>
          <div className="flex items-center justify-center mt-10 space-x-10">
            <button
              onClick={() => {
                router.push("/login");
              }}
              type="button"
              className=" bg-blue-400 py-2 px-4 rounded hover:text-gray-800"
            >
              Ir para login
            </button>
            <button
              type="submit"
              className="bg-green-500 py-2 px-4 rounded hover:text-gray-800"
              disabled={carregando}
            >
              {carregando ? "Carregando..." : "Cadastrar"}
            </button>
          </div>
        </div>
      </form>
      {msg && <div className="text-red-800 mb-5">{msg}</div>}
    </div>
  );
}

export default Cadastro;
