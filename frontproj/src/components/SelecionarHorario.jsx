import { useState } from "react";

function SelecionarHorario({ children, selectedHorario, onSelect, disabled }) {
  const isSelected = selectedHorario === children;

  return (
    <button
      className={`text-black text-center justify-center p-1.5  border-2 rounded-md border-purple-800 shadow-xl ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : isSelected
          ? "bg-green-300"
          : "bg-white"
      }`}
      onClick={() => {
        onSelect(children);
      }}
    >
      {children}
    </button>
  );
}

export default SelecionarHorario;
