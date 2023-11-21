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

const ModalCambiarPassword = () => {
  const [open, setOpen] = React.useState(false);
  const [passwordActual, setPasswordActual] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({});
  const { auth } = useAuth();
  const { buscarProductPorId } = useProduct();

  const user = auth.user;
  const userId = user._id;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (newPassword !== repetirPassword) {
      setAlerta({
        msg: "Las password no coinciden",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    try {
      const { data } = await clienteAxios.put(
        `/users/update-password`,
        { userId, passwordActual, newPassword },
        config
      );

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setNewPassword("");
        setPasswordActual("");
        setRepetirPassword("");
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  };

  const { msg } = alerta;

  return (
    <div>
      <button
        onClick={handleOpen}
        className="mt-5 bg-indigo-300 p-1 rounded-md font-semibold hover:bg-indigo-500"
      >
        Actualizar password
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
              ACTUALIZAR PASSWORD
            </Typography>

            <div>{msg && <Alerta alerta={alerta} />}</div>
            <div className="w-full max-w-md mx-auto">
              <form
                onSubmit={handleUpdatePassword}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="passwordActual"
                  >
                    Password actual
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="passwordActual"
                    type="password"
                    placeholder="Tu password actual"
                    value={passwordActual}
                    onChange={(e) => setPasswordActual(e.target.value)}
                  />
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nuevaPassword"
                  >
                    Nueva password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nuevaPassword"
                    type="password"
                    placeholder="Nueva password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="repetirPassword"
                  >
                    repetir nueva password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="repetirPassword"
                    type="password"
                    placeholder="Nueva password"
                    value={repetirPassword}
                    onChange={(e) => setRepetirPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    ACTUALIZAR PASSWORD
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

export default ModalCambiarPassword;
