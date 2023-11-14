import React, { useState } from "react";
import useProduct from "../hooks/useProduct";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Cart = () => {
  const { carrito, deleteProductCart } = useProduct();
  const { auth } = useAuth();

  const totalCart = () => {
    return carrito.reduce((total, item) => {
      return total + item.qty * item.product.price;
    }, 0);
  };

  const handleFinalizarCompra = () => {
    console.log("Finalizar compra", carrito);
  };

  return (
    <div className=" min-h-screen">
      <div className="bg-gray-200 p-4 mt-2 xl:ml-60 sm:ml-20 rounded-md shadow-md">
        <h2 className="text-2xl uppercase p-10 font-semibold text-center mb-4">
          Carrito
        </h2>

        {auth.user ? (
          <div>
            {" "}
            <ul>
              {carrito.map((item) => (
                <li
                  key={item.product._id}
                  className="mb-4 border-b-2 pb-4 border-indigo-400"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <img
                        className="w-32 h-32"
                        src={item.product.image}
                        alt=""
                      />
                      <div>
                        <strong className="text-blue-600 text-xl">
                          {item.product.title}
                        </strong>
                        <p className="text-gray-500 text-xl font-semibold">
                          Precio Unitario:{" "}
                          <span className="text-black font-bold">
                            ${item.product.price}
                          </span>
                        </p>
                        <button
                          onClick={() => deleteProductCart(item.product._id)}
                          className="font-semibold text-red-600 pt-2"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-700">
                        Cantidad: {item.qty}
                      </span>
                      <p className="text-green-700">
                        Total: ${item.qty * item.product.price}
                      </p>
                    </div>
                  </div>
                </li>
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
          <h4 className="text-2xl font-semibold p-10 text-center">
            Para ver tu carrito debes iniciar sesion
          </h4>
        )}
      </div>
    </div>
  );
};

export default Cart;
