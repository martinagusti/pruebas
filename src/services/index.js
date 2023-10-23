import axios from "axios";

import { login, registerUser, updateProfile } from "./authService";
import { getPointsOfSale, createPoint, editPoint } from "./pointsOfSaleService";
import {
  getProviders,
  createProvider,
  editProvider,
  deleteProvider,
} from "./providersService";
import {
  getIncomes,
  createIncome,
  updateIncomeFile,
  updateIncome,
  deleteIncome,
} from "./incomesService";

import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./expensesService";

const isBearerTokenRequired = (url) => {
  const parsedUrl = new URL(url);
  const publicRoutes = ["/users/login", "/users"];

  if (publicRoutes.includes(parsedUrl.pathname)) {
    return false;
  } else {
    return true;
  }
};

axios.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("peixateriaToken"));

    if (token && isBearerTokenRequired(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    //arreglar aqui
    /*   if(response.data){
        //arreglar aqui
            localStorage.setItem("currentUser", JSON.stringify(response.data))
        } */
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.request.status === 403) {
      console.log("Usuario o contraseña incorrecto");
    }

    return Promise.reject(error);
  }
);

export {
  login,
  registerUser,
  updateProfile,
  getPointsOfSale,
  createPoint,
  editPoint,
  getProviders,
  createProvider,
  editProvider,
  deleteProvider,
  getIncomes,
  createIncome,
  updateIncomeFile,
  updateIncome,
  deleteIncome,
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
