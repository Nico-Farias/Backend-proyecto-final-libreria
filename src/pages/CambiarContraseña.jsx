import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../axios/clienteAxios";
import { useParams } from "react-router-dom";

const CambiarPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState("");

  const params = useParams();
  const { tokenReset } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([setNewPassword, setRepetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    try {
      const { data } = await clienteAxios.put(
        `/users/reset-password/${tokenReset}`,
        {
          newPassword,
        }
      );

      console.log(data);
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        setNewPassword("");
        setRepetirPassword("");
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            RESTABLECER CONTRASEÑA
          </h2>
        </div>

        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 ">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="pt-2">
              <label for="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autocomplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
            <div className="pt-2">
              <label for="password" className="sr-only">
                Repite tu contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
                autocomplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>
          <button className="mt-5 items-center rounded-md bg-green-300 hover:bg-green-700 hover:text-white font-semibold p-2">
            CAMBIAR CONTRASEÑA
          </button>
        </form>
      </div>
    </div>
  );
};

export default CambiarPassword;
