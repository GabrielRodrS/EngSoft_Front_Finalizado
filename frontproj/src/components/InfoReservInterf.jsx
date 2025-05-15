"use client";

import { useRouter } from "next/navigation";
import InfoReservInterf2 from "./InfoReservInterf2";

export default function InfoReservInterf({ reserva }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex md:flex-row flex-col space-y-5 md:space-y-0 md:space-x-5 w-[90%] md:w-4/6 h-max items-center justify-evenly bg-white border-2 border-black pt-2 pb-2 px-5">
        <div className="flex flex-col items-center">
          <h2 className="py-2 font-bold text-2xl ">{reserva.esporte}</h2>
          <button
            type="button"
            className="py-2 px-4 rounded-md bg-red-400"
            onClick={() => {
              router.push(
                `/cancelar?data=${reserva.data}&horario=${reserva.horario}&valor=${reserva.valor}&bola=${reserva.bola}&rede=${reserva.rede}&coletes=${reserva.coletes}`
              );
            }}
          >
            Cancelar
          </button>
        </div>
        <InfoReservInterf2 reserva={reserva}></InfoReservInterf2>
      </div>
    </div>
  );
}
