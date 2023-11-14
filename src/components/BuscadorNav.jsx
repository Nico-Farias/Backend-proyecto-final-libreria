import React from "react";

const BuscadorNav = () => {
  return (
    <>
      <div className="flex-grow hidden md:flex">
        <input
          type="text"
          placeholder="Buscar"
          className="bg-gray-700 text-white px-3 py-1 rounded-l-md focus:outline-none"
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded-r-md hover:bg-blue-600 focus:outline-none">
          Buscar
        </button>
      </div>
    </>
  );
};

export default BuscadorNav;
