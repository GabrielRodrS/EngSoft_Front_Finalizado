"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Interface from "../../components/Interface";
import FundoFormulariosInt from "../../components/FundoFormulariosInt";
import Titulo from "../../components/Titulo";
import InfoReserv from "../../components/InfoReserv";
import axios from "axios";

export default function Cancelar() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CancelarContent />
    </Suspense>
  );
}

function CancelarContent() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [reservaInfo, setReservaInfo] = useState({
    data: "",
    horario: "",
    valor: "",
    bola: false,
    rede: false,
    coletes: false,
  });

  useEffect(() => {
    setReservaInfo({
      data: searchParams.get("data") || "",
      horario: searchParams.get("horario") || "",
      valor: searchParams.get("valor") || "",
      bola: searchParams.get("bola") === "true",
      rede: searchParams.get("rede") === "true",
      coletes: searchParams.get("coletes") === "true",
    });
  }, [searchParams.toString()]);

  async function cancelarRes() {
    if (!reservaInfo.data || !reservaInfo.horario) {
      console.error("Erro: informações da reserva estão incompletas.");
      return;
    }

    try {
      const userEmail = localStorage.getItem("userEmail");

      if (!userEmail) {
        console.error("Erro: Usuário não encontrado.");
        return;
      }

      const url = `${apiURL}/reservas/cancelar`;

      const resultado = await axios.delete(url, {
        params: {
          userEmail: userEmail,
          data: reservaInfo.data,
          horario: reservaInfo.horario,
        },
      });

      if (resultado.status === 200) {
        console.log("Reserva cancelada com sucesso!");

        await axios.post(`${apiURL}/notificacoes`, {
          data: reservaInfo.data,
          horario: reservaInfo.horario,
          verif: false,
          userEmail: userEmail,
        });

        router.push("/interfacePrincipal");
      } else {
        console.error(
          "Erro ao cancelar reserva: status inesperado",
          resultado.status
        );
      }
    } catch (error) {
      console.error(
        "Erro ao cancelar reserva:",
        error.response?.data || error.message
      );
    }
  }

  return (
    <Interface>
      <FundoFormulariosInt>
        <Titulo>Solicitar cancelamento</Titulo>
        <h2 className="text-center font-bold mt-10 mb-4">Informações:</h2>

        <InfoReserv {...reservaInfo} />
        <p className="font-bold mt-5">Seu dinheiro será estornado em breve!</p>
        <button
          type="button"
          className="py-2 px-4 rounded-md bg-red-400 my-5 disabled:opacity-50"
          disabled={!reservaInfo.data || !reservaInfo.horario}
          onClick={cancelarRes}
          aria-label="Cancelar reserva"
        >
          Cancelar
        </button>
      </FundoFormulariosInt>
    </Interface>
  );
}
