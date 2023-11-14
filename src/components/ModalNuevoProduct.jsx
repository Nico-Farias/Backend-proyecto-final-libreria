import * as React from "react";
import { useState } from "react";
import Alerta from "./Alerta";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import clienteAxios from "../axios/clienteAxios";
import useAuth from "../hooks/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalNuevoProduct = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [alerta, setAlerta] = useState({});

  const { auth } = useAuth();

  const userId = auth.user._id;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNewProduct = async (e) => {
    e.preventDefault();

    if ([title, categoria, image, stock, price].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setVendedor(userId);

      await clienteAxios.post(
        "/products/new-product",
        { title, categoria, image, stock, price, vendedor },
        config
      );

      setAlerta({
        msg: "Producto agregado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      setTitle("");
      setCategoria("");
      setImage("");
      setPrice("");
      setStock("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-blue-500 hover:bg-blue-700 text-white  font-semibold py-2  px-4 rounded-full mt-4"
      >
        Agregar Producto
      </button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Producto a agregar
            </Typography>

            <div>{msg && <Alerta alerta={alerta} />}</div>

            <div class="w-full max-w-md mx-auto">
              <form
                onSubmit={handleNewProduct}
                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="title"
                  >
                    Título
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="categoria"
                  >
                    Categoría
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="categoria"
                    type="text"
                    placeholder="Categoría"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="imagen"
                  >
                    Imagen
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="imagen"
                    type="file"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="stock"
                  >
                    Stock
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="stock"
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="price"
                  >
                    Precio
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="text"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div class="flex items-center justify-between">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    AGREGAR
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalNuevoProduct;
