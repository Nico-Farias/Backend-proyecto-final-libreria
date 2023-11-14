import * as React from "react";
import useAuth from "../hooks/useAuth";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import useProduct from "../hooks/useProduct";

export default function BasicMenu() {
  const { auth, cerrarSesionAuth } = useAuth();

  const { carrito } = useProduct();

  const totalQty = () => {
    return carrito.reduce((total, item) => {
      return total + item.qty;
    }, 0);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCerrarSesion = (e) => {
    e.preventDefault();
    cerrarSesionAuth();
  };

  return (
    <div className="flex justify-center items-center gap-10">
      <div>
        {auth.user ? (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{ color: "white", fontWeight: "bold" }}
            >
              <img
                className="mr-2"
                src="../../public/icons8-male-user-32.png"
              />{" "}
              {auth.user.nombre}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Link to={"/profile"}>Mi cuenta</Link>
              </MenuItem>
              <MenuItem onClick={handleCerrarSesion}>Cerrar sesion</MenuItem>
            </Menu>
          </div>
        ) : (
          <MenuItem>
            <Link to={"/login"} className="font-bold text-white uppercase">
              Iniciar sesion
            </Link>
          </MenuItem>
        )}
      </div>

      <div>
        <a className="flex justify-center items-center" href="/carrito">
          <img
            className="w-8 h-8 "
            src="../../public/icons8-shopping-cart-50.png"
            alt="logoCart"
          />
          <p>{totalQty()}</p>
        </a>
      </div>
    </div>
  );
}
