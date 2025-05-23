import { Check, X } from "lucide-react";

function InfoReserv({ data, horario, valor, bola, rede, coletes }) {
  return (
    <div className="flex  flex-col md:flex-row w-5/6 h-1/4 md:space-x-3 space-y-3 md:space-y-0 ">
      <div className="flex flex-col w-full md:w-2/3 bg-green-200 rounded-sm space-y-2 text-black mr-5 pb-2 pl-2">
        <h3 className="ml-2 mt-2">Data: {data}</h3>
        <h3 className="ml-2">Horário: {horario}</h3>
        <h3 className="ml-2">Valor: {valor},00 R$</h3>
      </div>
      <div className="flex flex-col bg-green-200 rounded-sm w-full md:w-2/3 space-x-2 text-black">
        <h3 className="ml-2 mt-1 mb-5">Equipamentos:</h3>
        <div className="flex flex-row space-x-3 items-center justify-center pb-2">
          <div className="flex flex-col items-center ">
            <label className="">Bola</label>
            {bola ? (
              <Check size={20} className="text-green-800"></Check>
            ) : (
              <X className="text-red-600" size={20}></X>
            )}
          </div>
          <div className="flex flex-col items-center">
            <p className="">Rede</p>
            {rede ? (
              <Check size={20} className="text-green-800"></Check>
            ) : (
              <X className="text-red-600" size={20}></X>
            )}
          </div>
          <div className="flex flex-col items-center">
            <p className="">Coletes</p>
            {coletes ? (
              <Check size={20} className="text-green-800"></Check>
            ) : (
              <X className="text-red-600" size={20}></X>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoReserv;
