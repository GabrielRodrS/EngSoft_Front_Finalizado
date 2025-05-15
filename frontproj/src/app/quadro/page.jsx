"use client";

import Interface from "../../components/Interface";
import SelecionarHorario from "../../components/SelecionarHorario";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Quadro() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [bola, setBola] = useState(false);
  const [rede, setRede] = useState(false);
  const [coletes, setColetes] = useState(false);
  const [msg, setMsg] = useState("");
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [data, setData] = useState("");
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  const router = useRouter();
  const dateInputRef = useRef(null);
  const baseValor = 40;

  useEffect(() => {
    const emailOn = localStorage.getItem("userEmail");
    if (!emailOn) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (data) {
      const [year, month, day] = data.split("-");
      const formattedDate = `${day}-${month}-${year}`;

      axios
        .get(`${apiURL}/reservas/quadro?data=${formattedDate}`)

        .then((response) => {
          setHorariosOcupados(response.data.map((hora) => hora.horario));
          console.log(horariosOcupados);
        })
        .catch((error) => {
          console.log(error);
          setMsg(
            error.response?.data?.message ||
              "Erro ao buscar horários. Tente novamente!"
          );
        });
    }
  }, [data]);

  const solicitar = (e) => {
    e.preventDefault();

    if (!data) {
      setMsg("Selecione uma data!");
      return;
    }

    if (!selectedHorario) {
      setMsg("Selecione um horário!");
      return;
    }

    const valorFinal =
      baseValor + (bola ? 5 : 0) + (rede ? 5 : 0) + (coletes ? 5 : 0);

    router.push(
      `/solicitarReserva?valor=${valorFinal}&horario=${selectedHorario}&data=${data}&bola=${bola}&rede=${rede}&coletes=${coletes}`
    );
  };

  const handleSelectHorario = (horario) => {
    if (!horariosOcupados.includes(horario)) {
      setSelectedHorario((prev) => (prev === horario ? null : horario));
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (dateInputRef.current) {
      dateInputRef.current.min = today;
    }
  }, []);

  return (
    <Interface>
      <h1 className="text-center font-bold text-2xl sm:text-4xl text-amber-500 mt-5 mb-0 md:mb-5">
        Quadro de horários
      </h1>

      <div className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0 justify-center items-start">
        <div className="flex flex-col items-center  shadow-xl rounded-md w-full md:w-2/6 p-6 order-1">
          <div className=" bg-gradient-to-b from-gray-400 to-gray-100 w-full text-black py-4 mb-4 rounded">
            <h1 className="text-center font-bold text-xl md:text-2xl">
              Selecionar horário
            </h1>
          </div>
          <div className="grid grid-rows-5 grid-cols-3 gap-4 w-full">
            {[
              "8:00",
              "9:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
              "22:00",
            ].map((hora) => (
              <SelecionarHorario
                key={hora}
                selectedHorario={selectedHorario}
                onSelect={handleSelectHorario}
                disabled={horariosOcupados.includes(hora)}
              >
                {hora}
              </SelecionarHorario>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center shadow-xl rounded-md w-full md:w-2/6 p-6 order-2">
          <div className=" w-full bg-gradient-to-b from-gray-400 to-gray-100 text-black py-4 mb-4 rounded">
            <h1 className="text-center font-bold text-xl md:text-2xl">
              Selecionar data
            </h1>
          </div>
          <input
            ref={dateInputRef}
            className="border rounded px-3 py-2 mb-6 w-full"
            type="date"
            onChange={(e) => setData(e.target.value)}
          />

          <div className="text-black w-full space-y-2 mb-6">
            <h3 className="font-bold mb-2">Equipamentos necessários:</h3>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={bola}
                onChange={() => setBola(!bola)}
              />
              <label>Bola 🏀</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={rede}
                onChange={() => setRede(!rede)}
              />
              <label>Rede 🥅</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={coletes}
                onChange={() => setColetes(!coletes)}
              />
              <label>Coletes 🎽</label>
            </div>
          </div>

          <form onSubmit={solicitar} className="w-full text-center">
            <button
              type="submit"
              className="bg-green-500 py-2 px-4 rounded text-white hover:text-gray-800"
            >
              Solicitar
            </button>
          </form>

          {msg && <div className="text-red-800 font-semibold mt-5">{msg}</div>}
        </div>
      </div>
    </Interface>
  );
}

export default Quadro;
