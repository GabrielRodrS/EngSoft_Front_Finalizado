"use client";

import InfoReservHist from "../../components/InfoReservHist";
import Interface from "../../components/Interface";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Historico() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [filtroData, setFiltroData] = useState("");
  const [filtroHorario, setFiltroHorario] = useState("");
  const [historico, setHistorico] = useState([]);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const emailOn = localStorage.getItem("userEmail");
    if (!emailOn) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      setMsg("Usuário não encontrado.");
      return;
    }

    axios
      .get(`${apiURL}/reservas/historico?userEmail=${userEmail}`)
      .then((response) => {
        console.log("Dados recebidos:", response.data);
        setHistorico(response.data);
      })
      .catch((error) => {
        console.log(error);
        setMsg(
          error.response?.data?.message ||
            "Erro ao buscar histórico. Tente novamente!"
        );
      });
  }, []);

  const formatarData = (data) => {
    if (!data) return "";
    const partes = data.split("-");
    if (partes.length === 3) {
      if (partes[0].length === 4) {
        return `${partes[2].padStart(2, "0")}-${partes[1].padStart(2, "0")}-${
          partes[0]
        }`;
      }

      return `${partes[0].padStart(2, "0")}-${partes[1].padStart(2, "0")}-${
        partes[2]
      }`;
    }
    return data;
  };

  const historicoFiltrado = historico.filter((reserva) => {
    const dataFormatada = filtroData ? formatarData(filtroData) : "";
    const dataReservaFormatada = formatarData(reserva.data);
    console.log(
      "Data filtrada:",
      dataFormatada,
      "Data reserva:",
      dataReservaFormatada
    );
    const dataCondicao = filtroData
      ? dataReservaFormatada === dataFormatada
      : true;
    const horarioCondicao = filtroHorario
      ? reserva.horario === filtroHorario
      : true;
    return dataCondicao && horarioCondicao;
  });

  return (
    <Interface>
      <div className="h-max w-full flex items-center justify-center">
        <div className="flex flex-col space-y-3 bg-stone-200 w-full md:w-3/5 pb-6 rounded-xl ">
          <h1 className="text-center font-bold mb-5 text-xl sm:text-3xl mt-8 bold text-yellow-800">
            Histórico de horários
          </h1>
          <div className="flex flex-col space-y-2 md:space-y-0 items-start md:flex-row space-x-8 md:space-x-16 md:items-center justify-center mx-5">
            <div>
              <h2 className="font-bold text-lg sm:text-2xl text-yellow-700">
                Filtros:
              </h2>
            </div>
            <div>
              <label className="text-blue-600 mr-2">Data:</label>
              <input
                type="date"
                className="border rounded px-3 py-2"
                value={filtroData}
                onChange={(e) => setFiltroData(e.target.value)}
              />
            </div>
            <div>
              <label className="text-blue-600 mr-2">Horário:</label>
              <select
                className="appearance-none border-2 border-gray-300 rounded-lg p-1 text-base max-w-xs focus:border-blue-500 focus:bg-blue-50 transition-colors duration-300 text-center"
                value={filtroHorario}
                onChange={(e) => setFiltroHorario(e.target.value)}
              >
                <option value="">Todos</option>
                {[...Array(15)].map((_, i) => {
                  const hour = i + 8;
                  return (
                    <option key={hour} value={`${hour}:00`}>
                      {hour}:00
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {historicoFiltrado.length > 0 ? (
            historicoFiltrado.map((reserva) => (
              <InfoReservHist key={reserva.id} reserva={reserva} />
            ))
          ) : (
            <div className="text-center text-gray-800 font-bold mt-10">
              {msg ||
                "Nenhuma reserva encontrada para os filtros selecionados."}
            </div>
          )}
        </div>
      </div>
    </Interface>
  );
}
