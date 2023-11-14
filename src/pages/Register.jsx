import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../axios/clienteAxios";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [alerta, setAlerta] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, apellido, email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      setTimeout(() => {
        setAlerta({});
      }, 5000);
      return;
    }

    try {
      const { data } = await clienteAxios.post("/users/register", {
        nombre,
        apellido,
        email,
        password,
        role,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/login");
      }, 2000);

      setNombre("");
      setApellido("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            REGISTRO DE USUARIO
          </h2>
        </div>

        {msg && <Alerta alerta={alerta} />}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
          action="#"
          method="POST"
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="pt-2">
              <label for="nombre" className="sr-only">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autocomplete="current-nombre"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Tu nombre"
              />
            </div>

            <div className="pt-2">
              <label for="apellido" className="sr-only">
                Apellido
              </label>
              <input
                id="apellido"
                name="apellido"
                type="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                autocomplete="current-apellido"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Tu apellido"
              />
            </div>

            <div className="pt-2">
              <label for="email-address" className="sr-only">
                Correo Electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo Electrónico"
              />
            </div>
            <div className="pt-2">
              <label for="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autocomplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>

            <div className="pt-2">
              <label for="role" className="sr-only">
                Role
              </label>
              <input
                id="role"
                name="role"
                type="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Premium - User  "
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to={"/login"}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Iniciar sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
