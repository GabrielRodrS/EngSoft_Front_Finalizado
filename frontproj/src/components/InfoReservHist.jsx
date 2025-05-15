"use client";

import InfoReserv from "./InfoReserv";
import { useRouter } from "next/navigation";

export default function InfoReservHist({ reserva }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-full ">
      <div className="flex md:flex-row flex-col md:space-x-5 h-max w-5/6 md:w-4/5 items-center justify-evenly border-1 bg-white border-2 border-black py-3 px-2">
        <div className="flex flex-col md:mx-5">
          <h2 className="md:py-2 py-1 font-bold text-xl sm:text-2xl ">
            {reserva.esporte}
          </h2>
        </div>

        <InfoReserv {...reserva}></InfoReserv>
      </div>
    </div>
  );
}
