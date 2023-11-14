import React from "react";
import Categorias from "./Categorias";

const Navegacion = () => {
  return (
    <>
      <nav className="space-x-4 md:space-x-8 flex items-center">
        <Categorias />
        <a href="/ofertas" className="text-white  text-2xl hover:text-gray-400">
          Ofertas
        </a>
      </nav>
    </>
  );
};

export default Navegacion;
