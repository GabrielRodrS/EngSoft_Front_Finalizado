function FundoFormulariosInt({ children }) {
  return (
    <div className="h-min-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center w-4/5 md:w-1/2 lg:w-1/3 justify-center bg-white rounded-2xl shadow-2xl mt-10">
        {children}
      </div>
    </div>
  );
}

export default FundoFormulariosInt;
