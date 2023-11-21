import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Inicio from "./Layouts/Inicio";
import PagePrincipal from "./pages/PagePrincipal";
import Login from "./pages/Login";
import Ofertas from "./pages/Ofertas";
import Cart from "./pages/Cart";
import { AuthProvider } from "./context/AuthProvider";
import { ProductProvider } from "./context/ProductProvider";
import Register from "./pages/register";
import Profile from "./pages/Profile";
import RecuperarPassword from "./pages/RecuperarPassword";
import CambiarPassword from "./pages/CambiarContraseña";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/recuperar-password"
                element={<RecuperarPassword />}
              />
              <Route
                path="/reset-password/:tokenReset"
                element={<CambiarPassword />}
              />

              <Route path="/" element={<Inicio />}>
                <Route index element={<PagePrincipal />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/ofertas" element={<Ofertas />} />
                <Route path="/carrito" element={<Cart />} />
              </Route>
            </Routes>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
