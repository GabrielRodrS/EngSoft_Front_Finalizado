function FundoFormularios({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white flex items-center justify-center rounded-md  shadow-xl">
        {children}
      </div>
    </div>
  );
}

export default FundoFormularios;
