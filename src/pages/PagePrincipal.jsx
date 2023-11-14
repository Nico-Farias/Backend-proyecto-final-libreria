import React, { useEffect, useState } from "react";
import CardLibro from "../components/CardLibro";
import useProduct from "../hooks/useProduct";

const PagePrincipal = () => {
  const { filtrarProductos } = useProduct();

  return (
    <div className=" container w-full flex justify-center  items-center m-5">
      <div className=" xl:pl-60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
        {filtrarProductos.map((product) => (
          <CardLibro key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PagePrincipal;
