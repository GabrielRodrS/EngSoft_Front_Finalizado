import { Check, X } from "lucide-react";

export default function InfoReserv2({ reserva }) {
  return (
    <div className="flex flex-col md:flex-row w-full md:w-2/3 h-auto space-y-3 md:space-y-0 md:space-x-3">
      <div className="flex flex-col w-full md:w-1/2 bg-green-200 rounded-sm space-y-2 text-black p-3">
        <h3>Data: {reserva.data}</h3>
        <h3>Horário: {reserva.horario}</h3>
        <h3>Valor: {reserva.valor},00 R$</h3>
      </div>
      <div className="flex flex-col bg-green-200 rounded-sm w-full md:w-1/2 text-black p-3">
        <h3 className="mb-3 text-center">Equipamentos:</h3>
        <div className="flex  sm:flex-row flex-col md:space-x-4 items-center justify-center">
          <div className="flex flex-col items-center">
            <label>Bola</label>
            {reserva.bola ? (
              <Check className="text-green-800" size={20} />
            ) : (
              <X className="text-red-600" size={20} />
            )}
          </div>
          <div className="flex flex-col items-center">
            <label>Rede</label>
            {reserva.rede ? (
              <Check className="text-green-800" size={20} />
            ) : (
              <X className="text-red-600" size={20} />
            )}
          </div>
          <div className="flex flex-col items-center">
            <label>Coletes</label>
            {reserva.coletes ? (
              <Check className="text-green-800" size={20} />
            ) : (
              <X className="text-red-600" size={20} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
