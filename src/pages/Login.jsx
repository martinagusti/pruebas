import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import "./login.css";
import { login } from "../services";
import { AuthContext } from "../context/AuthContext";

function Login({ page, setPage }) {
  const { setToken, setUser, token } = useContext(AuthContext);
  const [errorText, setErrorText] = useState();

  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataUser) => {
    try {
      const response = await login(dataUser.email, dataUser.password);

      if (response.data[0].accesToken) {
        localStorage.setItem(
          "peixateriaUser",
          JSON.stringify(response.data[1])
        );
        localStorage.setItem(
          "peixateriaToken",
          JSON.stringify(response.data[0].accesToken)
        );

        setToken(response.data[0].accesToken);

        navigateTo("/");
        setPage("home");

        setErrorText(null);
      }
    } catch (error) {
      console.log(error);
      if (error?.response.request.status === 403) {
        setErrorText("Usuario o contraseña incorrecto");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="loginContainer-form">
        <div className="login-icono"></div>
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />

        {errors.email?.type === "required" && <span>Campo requerido</span>}
        {errors.email?.type === "pattern" && <span>Email no es valido</span>}

        <input
          type={"password"}
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 6,
          })}
        />

        {errors.password?.type === "required" && <span>Campo requerido</span>}
        {errors.password?.type === "minLength" && (
          <span>Tu contraseña deberia tener 6 o mas digitos</span>
        )}

        {errorText && <span>{errorText}</span>}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
