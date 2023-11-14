import * as React from "react";
import { useState } from "react";
import useProduct from "../hooks/useProduct";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import clienteAxios from "../axios/clienteAxios";

const Categorias = () => {
  const {
    categoria,
    setProducts,
    products,
    selectCategory,
    setSelectCategory,
  } = useProduct();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCategory = (e) => {
    setSelectCategory(e.target.value);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <a className="text-white hover:text-gray-400">Categorias</a>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <select
          className="bg-indigo-100 p-1"
          value={selectCategory}
          onChange={handleCategory}
        >
          <option value={""}>Todas las categorias</option>
          {categoria.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </Menu>
    </div>
  );
};

export default Categorias;
