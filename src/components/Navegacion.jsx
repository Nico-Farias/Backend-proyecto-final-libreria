import React from "react";
import Categorias from "./Categorias";

const Navegacion = () => {
  return (
    <>
      <nav className="space-x-4 md:space-x-8 flex items-center">
        <Categorias />
      </nav>
    </>
  );
};

export default Navegacion;
