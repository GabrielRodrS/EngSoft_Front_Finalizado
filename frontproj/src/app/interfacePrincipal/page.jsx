"use client";

import Interface from "../../components/Interface";
import InfoReservInterf from "../../components/InfoReservInterf";
import { useState, useEffect } from "react";
import axios from "axios";

export default function InterfacePrincipal() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [reservas, setReservas] = useState([]);
  const [msg, setMsg] = useState("");

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
      .get(`${apiURL}/reservas/interface?userEmail=${userEmail}`)
      .then((response) => {
        console.log("Dados recebidos:", response.data);
        setReservas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar horários ativos:", error);
        setMsg(
          error.response?.data?.message ||
            "Erro ao buscar horários ativos. Tente novamente!"
        );
      });
  }, []);

  return (
    <Interface>
      <div className="h-max w-full flex items-center justify-center px-4">
        <div className="flex flex-col space-y-3 bg-stone-200 w-full sm:w-4/5 md:w-3/5 pb-6 rounded-xl">
          <div className="flex items-center justify-center mt-10">
            <h1 className="text-center text-xl sm:text-3xl mb-5 bold font-bold text-amber-800">
              Horários reservados recentemente
            </h1>
          </div>

          {reservas.length > 0 ? (
            reservas.map((reserva) =>
              reserva.id ? (
                <InfoReservInterf key={reserva.id} reserva={reserva} />
              ) : null
            )
          ) : (
            <div className="text-center text-gray-800 font-bold mt-10">
              {msg || "Você não possui nenhuma reserva alugada!"}
            </div>
          )}
        </div>
      </div>
    </Interface>
  );
}
