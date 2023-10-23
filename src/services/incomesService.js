import axios from "axios";

export const getIncomes = async () => {
  const incomes = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/incomes`
  );

  return incomes.data;
};

export const createIncome = async (idPuntoVenta, amount, type, concept) => {
  const incomes = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/incomes/create`,
    {
      idPointsOfSale: idPuntoVenta,
      amount,
      type,
      concept,
    }
  );

  return incomes.data;
};

export const updateIncomeFile = async (id) => {
  const incomes = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/incomes/files/${id}`
  );

  return incomes.data;
};

export const updateIncome = async (idPuntoVenta, amount, type, concept, id) => {
  const incomes = await axios.patch(
    `${import.meta.env.VITE_BACKEND_URL}/incomes/updateIncome/${id}`,
    { idPointsOfSale: idPuntoVenta, amount, type, concept }
  );

  return incomes.data;
};

export const deleteIncome = async (id) => {
  const deleted = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/incomes/delete/${id}`
  );

  return deleted.data;
};
