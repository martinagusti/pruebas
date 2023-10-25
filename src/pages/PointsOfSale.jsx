import { useState } from "react";
import { useForm } from "react-hook-form";

import "./pointsOfSale.css";
import { createPoint, editPoint, getPointsOfSale, login } from "../services";

function PointsOfSale({ points, setPoints }) {
  const [viewInsertPoint, setViewInsertPoint] = useState(false);
  const [nombre, setNombre] = useState();
  const [direccion, setDireccion] = useState();
  const [ciudad, setCiudad] = useState();
  const [codigoPostal, setCodigoPostal] = useState();
  const [id, setId] = useState();
  const [search, setSearch] = useState();
  const [editando, setEditando] = useState(false);

  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [errorText, setErrorText] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const { nombre, direccion, ciudad, codigoPostal } = data;

    try {
      if (editando === true) {
        const edited = await editPoint(
          nombre,
          direccion,
          ciudad,
          codigoPostal,
          id
        );

        setPoints(await getPointsOfSale());
        e.target.reset();
      } else {
        const created = await createPoint(
          nombre,
          direccion,
          ciudad,
          codigoPostal
        );

        setPoints([created[0], ...points]);
      }

      reset();
      setViewInsertPoint(false);
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.error);
    }
  };

  const handleOnChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleOnChangeDireccion = (e) => {
    setDireccion(e.target.value);
  };
  const handleOnChangeCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleOnChangeCodigoPostal = (e) => {
    setCodigoPostal(e.target.value);
  };

  const handleOnChangeSearch = async (e) => {
    setSearch(e.target.value);
  };

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOnChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleOnChangePostalCode = (e) => {
    setPostalCode(e.target.value);
  };

  const searchByName = async () => {
    const allPoints = await getPointsOfSale();
    const filtered = allPoints.filter((element) => {
      return element.name.toLowerCase().includes(search.toLowerCase());
    });
    if (search !== "") {
      setPoints(filtered);
    } else {
      const allPoints = await getPointsOfSale();
      setPoints(allPoints);
    }
  };

  const editar = async (event) => {
    event.preventDefault();

    try {
      const edited = await editPoint(
        event.target.name.value,
        event.target.address.value,
        event.target.city.value,
        event.target.postalCode.value,
        idEdit
      );

      setPoints(await getPointsOfSale());
      setEditando(false);
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.error);
    }
  };

  const edit = (element) => {
    setEditando(true);
    setName(element.name);
    setAddress(element.address);
    setCity(element.city);
    setPostalCode(element.postalCode);
    setIdEdit(element.ID);
  };

  const createNewPoint = () => {
    setEditando(false);
    setViewInsertPoint(true);
  };
  return (
    <div className="points-container">
      <div className="puntosVenta-container">
        <div className="points-header">
          <div className="point-search">
            <input
              className="point-search-input"
              type="text"
              id="nombre"
              defaultValue={search}
              placeholder="Buscar por nombre"
              onChange={handleOnChangeSearch}
            />
            <button
              onClick={() => searchByName()}
              className="points-lupa-btn"
            ></button>
          </div>
        </div>
        <div className="crearNuevo-container">
          <button onClick={() => createNewPoint()} className="points-btn-crear">
            NUEVO PUNTO
          </button>
        </div>

        {viewInsertPoint && (
          <div className="points-create-modal-container">
            <div className="points-create-modal">
              <form
                className="form-container"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  id="nombre"
                  defaultValue={nombre}
                  placeholder="nombre"
                  onChange={handleOnChangeNombre}
                  {...register("nombre", {
                    required: true,
                  })}
                />
                {errors.nombre?.type === "required" && (
                  <span>Campo requerido</span>
                )}
                <input
                  type="text"
                  id="direccion"
                  defaultValue={direccion}
                  placeholder="direccion"
                  onChange={handleOnChangeDireccion}
                  {...register("direccion", {
                    required: true,
                  })}
                />
                {errors.direccion?.type === "required" && (
                  <span>Campo requerido</span>
                )}
                <input
                  type="text"
                  id="ciudad"
                  defaultValue={ciudad}
                  placeholder="ciudad"
                  onChange={handleOnChangeCiudad}
                  {...register("ciudad", {
                    required: true,
                  })}
                />
                {errors.ciudad?.type === "required" && (
                  <span>Campo requerido</span>
                )}
                <input
                  type="number"
                  id="codigoPostal"
                  defaultValue={codigoPostal}
                  placeholder="codigo postal"
                  onChange={handleOnChangeCodigoPostal}
                  {...register("codigoPostal", {
                    required: true,
                  })}
                />
                {errors.codigoPostal?.type === "required" && (
                  <span>Campo requerido</span>
                )}
                <div className="modal-actions">
                  <button type="submit">CREAR</button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewInsertPoint(false);
                      setErrorText(null);
                    }}
                  >
                    CANCELAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editando && (
          <div className="modal-container">
            <div className="modal">
              <form
                className="form-edit-container"
                onSubmit={(event) => {
                  editar(event);
                }}
              >
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={name}
                  onChange={handleOnChangeName}
                />
                <label>Direccion</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={address}
                  onChange={handleOnChangeAddress}
                />
                <label>Ciudad</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={city}
                  onChange={handleOnChangeCity}
                />
                <label>Codigo postal</label>
                <input
                  type="number"
                  name="postalCode"
                  defaultValue={postalCode}
                  onChange={handleOnChangePostalCode}
                />
                {errorText && <span>{errorText}</span>}
                <div className="modal-actions">
                  <button type="submit">GUARDAR</button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditando(false);
                      setErrorText(null);
                    }}
                  >
                    CANCELAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="content-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Ciudad</th>
              <th>Codigo Postal</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {points.map((element) => {
              const date = new Date(element.date);
              return (
                <tr key={element.ID}>
                  <td>{element.name}</td>
                  <td>{element.address}</td>
                  <td>{element.city}</td>
                  <td>{element.postalCode}</td>
                  <td>{`${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`}</td>
                  <td>
                    <button
                      onClick={() => edit(element)}
                      className="points-btn-editar"
                    ></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PointsOfSale;
