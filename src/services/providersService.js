import axios from "axios";

export const getProviders = async () => {
  const providers = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/providers`
  );

  return providers.data;
};

export const createProvider = async (
  nombre,
  direccion,
  ciudad,
  codigoPostal,
  razonSocial,
  cif
) => {
  const provider = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/providers/create`,
    {
      name: nombre,
      businessName: razonSocial,
      cif: cif,
      address: direccion,
      postalCode: codigoPostal,
      city: ciudad,
    }
  );

  return provider.data;
};

export const editProvider = async (
  nombre,
  direccion,
  ciudad,
  codigoPostal,
  razonSocial,
  cif,
  id
) => {
  const provider = await axios.patch(
    `${import.meta.env.VITE_BACKEND_URL}/providers/update/${id}`,
    {
      name: nombre,
      address: direccion,
      postalCode: codigoPostal,
      city: ciudad,
      businessName: razonSocial,
      cif: cif,
    }
  );

  return provider.data;
};

export const deleteProvider = async (id) => {
  console.log(id);
  const deleted = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/providers/delete/${id}`
  );
  return deleted.data;
};
