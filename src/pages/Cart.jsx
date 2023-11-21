import React, { useState, useEffect } from "react";
import useProduct from "../hooks/useProduct";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import clienteAxios from "../axios/clienteAxios";
import DetailsCart from "../components/DetailsCart";

const Cart = () => {
  const { carrito, deleteProductCart, finalizarCompra, setCarrito } =
    useProduct();
  const { auth } = useAuth();

  const totalCart = () => {
    return carrito.reduce((total, item) => {
      return total + item.qty * item.product.price;
    }, 0);
  };

  const handleFinalizarCompra = () => {
    const userId = auth.user._id;

    finalizarCompra(userId);
  };

  return (
    <div className=" min-h-screen">
      <div className="bg-gray-200 p-4 mt-2 xl:ml-60 sm:ml-20 rounded-md shadow-md">
        <h2 className="text-2xl uppercase p-10 font-semibold text-center mb-4">
          Carrito
        </h2>

        {auth.user ? (
          <>
            {carrito && carrito.length > 0 ? (
              <div>
                {" "}
                <ul>
                  {carrito.map((item) => (
                    <DetailsCart key={item.product._id} item={item} />
                  ))}
                </ul>
                <div className="flex  justify-evenly items-center">
                  <p className="text-2xl mt-5 p-5 text-center uppercase font-extrabold">
                    Total a pagar :{" "}
                    <span className="text-green-600 font-semibold">
                      ${totalCart()}
                    </span>
                  </p>

                  <button
                    onClick={handleFinalizarCompra}
                    className="text-2xl text-white font-bold  bg-indigo-500 hover:bg-indigo-300 rounded-xl p-2"
                  >
                    Finalizar compra
                  </button>
                </div>
              </div>
            ) : (
              <h3 className="text-2xl font-semibold p-10 text-center">
                Tu carrito esta vacio
              </h3>
            )}
          </>
        ) : (
          <h4 className="text-2xl font-semibold p-10 text-center">
            Para ver tu carrito debes iniciar sesion
          </h4>
        )}
      </div>
    </div>
  );
};

export default Cart;
