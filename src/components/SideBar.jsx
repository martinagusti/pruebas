import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import "./sideBar.css";
import { AuthContext } from "../context/AuthContext";

function SideBar({ page, setPage }) {
  const navigateTo = useNavigate();
  const { setToken, setUser, token } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("peixateriaUser");
    localStorage.removeItem("peixateriaToken");
    setToken(null);
    navigateTo("/");
  };
  return (
    <div className="sideBar-container">
      <div
        className="img-logo"
        onClick={() => {
          navigateTo("/");
          setPage("home");
        }}
      ></div>
      <div
        className={
          page === "puntos de venta"
            ? "img-salePoint page-active tooltip"
            : "img-salePoint tooltip"
        }
        onClick={() => {
          navigateTo("/pointsOfSale");
          setPage("puntos de venta");
        }}
      >
        <span className="tooltip-box">Puntos de venta</span>
      </div>
      <div
        className={
          page === "proveedores"
            ? "img-provider page-active tooltip"
            : "img-provider tooltip"
        }
        onClick={() => {
          navigateTo("/providers");
          setPage("proveedores");
        }}
      >
        <span className="tooltip-box">Proveedores</span>
      </div>
      <div
        className={
          page === "ingresos"
            ? "img-incomes page-active tooltip"
            : "img-incomes tooltip"
        }
        onClick={() => {
          navigateTo("/incomes");
          setPage("ingresos");
        }}
      >
        <span className="tooltip-box">Ingresos</span>
      </div>
      <div
        className={
          page === "gastos"
            ? "img-expenses page-active tooltip"
            : "img-expenses tooltip"
        }
        onClick={() => {
          navigateTo("/expenses");
          setPage("gastos");
        }}
      >
        <span className="tooltip-box">Gastos</span>
      </div>
      <div
        className={
          page === "estadisticas"
            ? "img-reports page-active tooltip"
            : "img-reports tooltip"
        }
        onClick={() => {
          navigateTo("/reports");
          setPage("estadisticas");
        }}
      >
        <span className="tooltip-box">Estadisticas</span>
      </div>
      <div
        className={
          page === "logout"
            ? "img-logout page-active tooltip"
            : "img-logout tooltip"
        }
        onClick={() => {
          logout();
          navigateTo("/login");
          setPage("login");
        }}
      >
        <span className="tooltip-box">Logout</span>
      </div>
    </div>
  );
}

export default SideBar;
