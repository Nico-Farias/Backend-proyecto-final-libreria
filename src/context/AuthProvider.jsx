import { createContext, useEffect, useState } from "react";
import clienteAxios from "../axios/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
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
        const { data } = await clienteAxios("/users/profile", config);
        const user = data;
        setAuth(user);
      } catch (error) {
        setAuth({});
      }
    };
    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({});
    localStorage.removeItem("token");
    localStorage.removeItem("carrito");
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, cerrarSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
