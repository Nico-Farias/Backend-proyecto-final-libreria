import { createContext, useEffect, useState } from "react";
import clienteAxios from "../axios/clienteAxios";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [alerta, setAlerta] = useState({});
  const [products, setProducts] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const { data } = await clienteAxios("/products");
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

  const deleteProductCart = (id) => {
    const cartActualizado = carrito.filter((prod) => prod._id !== id);
    setCarrito(cartActualizado);
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
    console.log(token);
    console.log(config);

    try {
      const { data } = await clienteAxios.post(
        `/users/add/${idProd}`,
        { userId, qty },
        config
      );
      console.log("data", data);
      setCarrito(data);
      localStorage.setItem("carrito", JSON.stringify(data));
    } catch (error) {
      console.log("Error en la solicitud:", error);
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };

export default ProductContext;
