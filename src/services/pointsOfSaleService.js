import axios from "axios";

export const getPointsOfSale = async () => {
  const points = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/pointsofsale`
  );

  return points.data;
};

export const createPoint = async (nombre, direccion, ciudad, codigoPostal) => {
  const points = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/pointsofsale/create`,
    {
      name: nombre,
      address: direccion,
      postalCode: codigoPostal,
      city: ciudad,
    }
  );

  return points.data;
};

export const editPoint = async (
  nombre,
  direccion,
  ciudad,
  codigoPostal,
  id
) => {
  const points = await axios.patch(
    `${import.meta.env.VITE_BACKEND_URL}/pointsofsale/update/${id}`,
    {
      name: nombre,
      address: direccion,
      postalCode: codigoPostal,
      city: ciudad,
    }
  );

  return points.data;
};
