import React from "react";
import { useState } from "react";
import useProduct from "../hooks/useProduct";
import useAuth from "../hooks/useAuth";

function CardLibro({ product }) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useProduct();
  const { auth } = useAuth();

  const handleToCart = () => {
    const userId = auth.user._id;
    const idProd = product._id;
    const qty = quantity;
    addToCart(userId, idProd, qty);
  };

  return (
    <div>
      <div className="border p-4 mb-4">
        <div className="flex items-center justify-center mb-2">
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: "300px", maxHeight: "250px" }}
          />
        </div>
        <h2 className="text-xl font-semibold mt-10 text-center">
          {product.title}
        </h2>
        <p className="mt-5 font-semibold">Precio: ${product.price}</p>
        <p className="mt-2 font-semibold">{product.stock} Disponibles</p>

        {auth.user ? (
          <div className="flex items-center mt-2">
            <label className="mr-2">Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded-md px-2 py-1 w-16"
              min="1"
              max={product.stock}
            />

            <button
              onClick={handleToCart}
              className="bg-blue-500  text-white px-3 py-1 ml-2 rounded-md"
            >
              Agregar al Carrito
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CardLibro;
