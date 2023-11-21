import React from "react";
import BuscadorNav from "./BuscadorNav";
import Navegacion from "./Navegacion";
import BasicMenu from "./Usuario";

const Header = () => {
  return (
    <div className="bg-sky-700 py-4 p-4 w-screen">
      <div className=" flex justify-around items-center gap-10">
        <a href="/" className="flex gap-4 items-center ">
          <img className="w-28 rounded-full" src="/ClickShop.jpg" alt="Logo" />
          <span className="text-white  text-lg font-extrabold">ClickBOOK</span>
        </a>
      </div>

      <div className="flex items-center justify-around space-x-4 md:space-x-8 mt-5">
        <div>
          <Navegacion />
        </div>

        <div className="flex gap-6 items-center">
          <div>
            <BasicMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
