import axios from "axios";

export function login(email, password) {
  return axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
    email,
    password,
  });
}

export const registerUser = async (name, email, password, confirmPassword) => {
  const registered = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/users/register`,
    {
      name,
      email,
      password,
      verifyPassword: confirmPassword,
    }
  );

  return registered.data;
};

export const updateProfile = async (name, password, confirmPassword) => {
  const updated = await axios.patch(
    `${import.meta.env.VITE_BACKEND_URL}/users/updateprofile`,
    {
      name,
      password,
      verifyPassword: confirmPassword,
    }
  );

  return updated.data;
};
