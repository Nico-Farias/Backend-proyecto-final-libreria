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
import useProduct from "../hooks/useProduct";

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

const ModalDeleteProduct = () => {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState("");

  const [alerta, setAlerta] = useState({});
  const { auth } = useAuth();
  const { buscarProductPorId } = useProduct();

  const user = auth.user;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const prod = await buscarProductPorId(id);

    if (prod === undefined || prod === null) {
      setAlerta({
        msg: "Producto no encontrado",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }
    if (user._id !== prod.vendedor) {
      setAlerta({
        msg: "Solo el creador puede eliminar el producto",
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    try {
      await clienteAxios.delete(`/products/delete-product/${id}`, config);

      setAlerta({
        msg: "Producto eliminado correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        setId("");
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
        setId("");
      }, 3000);
    }
  };

  const { msg } = alerta;

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full mt-2"
      >
        Eliminar Producto
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
              Producto a eliminar
            </Typography>

            <div>{msg && <Alerta alerta={alerta} />}</div>
            <div class="w-full max-w-md mx-auto">
              <form
                onSubmit={handleDeleteProduct}
                class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="title"
                  >
                    Id del producto a eliminar
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Título"
                    value={id || ""}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>

                <div class="flex items-center justify-between">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    ELIMINAR PRODUCTO
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

export default ModalDeleteProduct;
