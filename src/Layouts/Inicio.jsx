import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Inicio = () => {
  return (
    <div className="container">
      <Header />

      <div className="container ">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Inicio;
