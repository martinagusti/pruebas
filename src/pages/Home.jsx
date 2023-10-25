import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import "./home.css";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";
import { registerUser, updateProfile } from "../services";
import { useNavigate } from "react-router-dom";

function Home({ viewOptionsModal, setViewOptionsModal }) {
  const navigateTo = useNavigate();
  const { setToken, setUser, token } = useContext(AuthContext);

  const [viewNewUserModal, setViewNewUserModal] = useState(false);
  const [viewEditUserModal, setViewEditUserModal] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const [errorText, setErrorText] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setPasswordError(true);
      return;
    }
    const { name, email, password, confirmPassword } = data;
    try {
      const registered = await registerUser(
        name,
        email,
        password,
        confirmPassword
      );

      setPasswordError(false);
      setViewNewUserModal(false);

      setErrorText(null);

      reset();
    } catch (error) {
      setErrorText(error.response.data.error);
    }
  };

  const editUser = async (e) => {
    e.preventDefault();

    try {
      const updated = await updateProfile(name, password, repeatPassword);

      setViewEditUserModal(false);
      localStorage.removeItem("peixateriaUser");
      localStorage.removeItem("peixateriaToken");
      setToken(null);
      navigateTo("/");
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.error);
    }
  };

  const handleOnChangeEditName = (e) => {
    setName(e.target.value);
  };

  const handleOnChangeEditEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangeEditPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnChangeEditRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (token) {
    return (
      <div className="home-container">
        {viewOptionsModal && (
          <div className="options-modal-container">
            <div className="options-modal">
              <div className="modal-actionsVertical">
                <button
                  onClick={() => {
                    setViewOptionsModal(false);
                    setViewNewUserModal(true);
                  }}
                >
                  CREAR USUARIO
                </button>
                <button
                  onClick={() => {
                    const user = JSON.parse(
                      localStorage.getItem("peixateriaUser")
                    );
                    setName(user.name);
                    setEmail(user.email);
                    setViewOptionsModal(false);
                    setViewEditUserModal(true);
                  }}
                >
                  EDITAR USUARIO
                </button>
                <button onClick={() => setViewOptionsModal(false)}>
                  SALIR
                </button>
              </div>
            </div>
          </div>
        )}
        {viewNewUserModal && (
          <div className="editUser-modal-container">
            <div className="editUser-modal">
              <div className="register-avatar"></div>
              <form
                className="form-container"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre"
                  /* onChange={handleOnChangeName} */
                  {...register("name", {
                    required: true,
                  })}
                />
                {errors.name?.type === "required" && (
                  <span>Campo requerido</span>
                )}

                <input
                  className=""
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email?.type === "required" && (
                  <span>Campo requerido</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span>Email no valido</span>
                )}

                <input
                  className=""
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {errors.password?.type === "required" && (
                  <span>Campo requerido</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span>Tu contraseña deberia tener al menos 6 digitos</span>
                )}

                <input
                  className="r"
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {errors.confirmPassword?.type === "required" && (
                  <span>Campo requerido</span>
                )}
                {errors.confirmPassword?.type === "minLength" && (
                  <span>Tu contraseña deberia tener al menos 6 digitos</span>
                )}
                {passwordError && <span>La contraseña no coincide</span>}
                {errorText && <span>{errorText}</span>}
                <div className="modal-actions2">
                  <button>CREAR</button>
                  <button onClick={() => setViewNewUserModal(false)}>
                    CANCELAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        editar
        {viewEditUserModal && (
          <div className="editUser-modal-container">
            <div className="editUser-modal">
              <div className="register-avatar"></div>
              <form
                className="form-container"
                method="post"
                onSubmit={(event) => editUser(event)}
              >
                <input
                  type="text"
                  id="name"
                  defaultValue={name}
                  placeholder="Nombre"
                  onChange={handleOnChangeEditName}
                />

                <input
                  defaultValue={email}
                  className=""
                  type="text"
                  placeholder="Email"
                  onChange={handleOnChangeEditEmail}
                  readOnly
                />

                <input
                  defaultValue={password}
                  className=""
                  type="password"
                  placeholder="Password"
                  onChange={handleOnChangeEditPassword}
                />

                <input
                  defaultValue={repeatPassword}
                  className="r"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleOnChangeEditRepeatPassword}
                />

                {errorText && <span>{errorText}</span>}
                <div className="modal-actions2">
                  <button type="submit">GUARDAR</button>
                  <button
                    type="button"
                    onClick={() => setViewEditUserModal(false)}
                  >
                    CANCELAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <Login />;
  }
}

export default Home;
