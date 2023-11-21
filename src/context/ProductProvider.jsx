import { createContext, useEffect, useState } from "react";
import clienteAxios from "../axios/clienteAxios";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [alerta, setAlerta] = useState({});
  const [products, setProducts] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [itemQty, setItemQty] = useState(0);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const { data } = await clienteAxios(`/products`);
        setProducts(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    const categorias = [...new Set(products.map((prod) => prod.categoria))];
    setCategoria(categorias);
  }, [products]);

  useEffect(() => {
    // Obtener el carrito desde el localStorage al inicio
    const storedCarrito = localStorage.getItem("carrito");
    if (storedCarrito) {
      const parsedCarrito = JSON.parse(storedCarrito);

      setCarrito(parsedCarrito);
    }
  }, []);

  const deleteProductCart = async (userId, prodId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.put(
        `/users/update-cart/${userId}/${prodId}`,
        { userId },
        config
      );

      const carritoStorage = localStorage.getItem("carrito");
      const carritoParseado = JSON.parse(carritoStorage);

      const updatedCarrito = carritoParseado.filter((item) => {
        return item.product._id !== prodId;
      });

      // Actualizar el estado con el carrito actualizado
      setCarrito(updatedCarrito);
      localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = () => {
    if (!selectCategory) {
      return products;
    }

    const produc = products.filter((prod) => prod.categoria === selectCategory);
    return produc;
  };

  const buscarProductPorId = async (id) => {
    try {
      const { data } = await clienteAxios(`/products/id/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta([]);
    }, 5000);
  };

  const addToCart = async (userId, idProd, qty) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.post(
        `/users/add/${idProd}`,
        { userId, qty },
        config
      );

      // Actualizar el estado del carrito
      const updatedCart = data;
      setCarrito(updatedCart);
      console.log(updatedCart);
      // Guardar el carrito actualizado en localStorage
      localStorage.setItem("carrito", JSON.stringify(updatedCart));
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
  };

  const sumarCantidad = (qty) => {
    const cantidad = itemQty + qty;
    setItemQty(cantidad);
  };

  const finalizarCompra = async (userId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.post(
        `/users/finalizar-compra`,
        { userId },
        config
      );
      localStorage.removeItem("carrito");
      setCarrito({});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filtrarProductos = filterProducts();

  return (
    <ProductContext.Provider
      value={{
        alerta,
        mostrarAlerta,
        products,
        filtrarProductos,
        setSelectCategory,
        setProducts,
        selectCategory,
        categoria,
        buscarProductPorId,
        addToCart,
        carrito,
        setCarrito,
        deleteProductCart,
        finalizarCompra,
        setItemQty,
        itemQty,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };

export default ProductContext;
