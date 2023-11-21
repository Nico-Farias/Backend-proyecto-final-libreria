import React from "react";
import useProduct from "../hooks/useProduct";
import useAuth from "../hooks/useAuth";

const DetailsCart = ({ item }) => {
  const { deleteProductCart } = useProduct();
  const { auth } = useAuth();

  const handleEliminarProd = (prodId) => {
    const userId = auth.user._id;
    deleteProductCart(userId, prodId);
  };

  return (
    <div>
      <li className="mb-4 border-b-2 pb-4 border-indigo-400">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <img className="w-32 h-32" src={item.product.image} alt="" />
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
                onClick={() => handleEliminarProd(item.product._id)}
                className="font-semibold text-red-600 pt-2"
              >
                Eliminar
              </button>
            </div>
          </div>
          <div>
            <span className="text-gray-700">Cantidad: {item.qty}</span>
            <p className="text-green-700">
              Total: ${item.qty * item.product.price}
            </p>
          </div>
        </div>
      </li>
    </div>
  );
};

export default DetailsCart;
