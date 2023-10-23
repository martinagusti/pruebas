import axios from "axios";

export const getExpenses = async () => {
  const expenses = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/expenses`
  );

  return expenses.data;
};

export const createExpense = async (
  idPoint,
  idProvider,
  amount,
  fechaFactura,
  fechaPago,
  numFactura,
  status,
  concept
) => {
  const expense = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/expenses/create`,
    {
      idPoint,
      idProvider,
      amount,
      expenseDate: fechaFactura,
      paydate: fechaPago,
      code: numFactura,
      status,
      concept,
    }
  );

  return expense.data;
};

export const updateExpense = async (
  editPoint,
  editProvider,
  editNumFactura,
  editFechaFactura,
  editAmount,
  editStatus,
  editFechaPago,
  editConcept,
  id
) => {
  const expense = await axios.patch(
    `${import.meta.env.VITE_BACKEND_URL}/expenses/update/${id}`,
    {
      idPointsOfSale: editPoint,
      idProvider: editProvider,
      code: editNumFactura,
      expenseDate: editFechaFactura,
      amount: editAmount,
      status: editStatus,
      paydate: editFechaPago,
      concept: editConcept,
    }
  );

  return expense.data;
};

export const deleteExpense = async (id) => {
  const deleted = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/expenses/delete/${id}`
  );

  return deleted.data;
};
