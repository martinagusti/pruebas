import { useState } from "react";
import { useForm } from "react-hook-form";
import "./providers.css";
import {
  createProvider,
  deleteProvider,
  editProvider,
  getProviders,
} from "../services";
import useExpenses from "../hooks/useExpenses";

function Providers({ providers, setProviders }) {
  const { expenses, setExpenses, error, loading } = useExpenses();

  const [search, setSearch] = useState();
  const [viewInsertProvider, setViewInsertProvider] = useState(false);
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState();
  const [direccion, setDireccion] = useState();
  const [ciudad, setCiudad] = useState();
  const [codigoPostal, setCodigoPostal] = useState();
  const [razonSocial, setRazonSocial] = useState();
  const [cif, setCif] = useState();
  const [id, setId] = useState();

  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [cifValue, setCifValue] = useState("");
  const [idEdit, setIdEdit] = useState("");

  const [viewErrorModal, setViewErrorModal] = useState(false);
  const [viewDeleteModal, setViewDeleteModal] = useState(false);
  const [errorText, setErrorText] = useState();
  const [idDelete, setIdDelete] = useState();
  const [idDeletename, setIdDeleteName] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      const { nombre, direccion, ciudad, codigoPostal, razonSocial, cif } =
        data;

      const created = await createProvider(
        nombre,
        direccion,
        ciudad,
        codigoPostal,
        razonSocial,
        cif
      );

      setProviders([created[0], ...providers]);
      setViewInsertProvider(false);
      setErrorText(null);
      reset();
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

  const handleOnChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOnChangeRazonSocial = (e) => {
    setRazonSocial(e.target.value);
  };

  const handleOnChangeCif = (e) => {
    setCif(e.target.value);
  };

  const searchByName = async () => {
    const filtered = providers.filter((element) => {
      return element.name.toLowerCase().includes(search.toLowerCase());
    });
    if (search !== "") {
      setProviders(filtered);
    } else {
      const allProviders = await getProviders();
      setProviders(allProviders);
    }
  };

  const createNewProvider = () => {
    setViewInsertProvider(true);
  };

  const edit = (element) => {
    setEditando(true);
    setName(element.name);
    setAddress(element.address);
    setCity(element.city);
    setPostalCode(element.postalCode);
    setBusinessName(element.businessName);
    setCifValue(element.cif);
    setIdEdit(element.ID);
    console.log(element);
  };

  const editar = async (event) => {
    event.preventDefault();

    try {
      const edited = await editProvider(
        event.target.name.value,
        event.target.address.value,
        event.target.city.value,
        event.target.postalCode.value,
        event.target.businessName.value,
        event.target.cifValue.value,
        idEdit
      );

      console.log(edited);

      setProviders(await getProviders());
      setEditando(false);
      setErrorText(null);
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.error);
    }
  };

  const deleteProviderFunction = (element) => {
    setIdDelete(element.ID);
    setIdDeleteName(element.name);
    const find = expenses.filter((egreso) => {
      return egreso.idProvider == element.ID;
    });
    if (find.length > 0) {
      setViewErrorModal(true);
      setErrorText(
        "Esta accion no puede ser realizada debido a que este proveedor tiene datos asociados"
      );
    } else {
      setViewDeleteModal(true);
    }
  };

  const eliminando = async () => {
    try {
      const deleted = await deleteProvider(idDelete);
      console.log(deleted);
      setProviders(
        providers.filter((element) => {
          return element.ID !== idDelete;
        })
      );
      setViewDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
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

  const handleOnChangeBusinessName = (e) => {
    setBusinessName(e.target.value);
  };

  const handleOnChangeCifValue = (e) => {
    setCifValue(e.target.value);
  };

  return (
    <div className="providers-container">
      <div className="providers-header">
        <input
          type="text"
          id="nombre"
          defaultValue={search}
          placeholder="Buscar por nombre"
          onChange={handleOnChangeSearch}
          className="point-search-input"
        />
        <button
          onClick={() => searchByName()}
          className="points-lupa-btn"
        ></button>
      </div>

      <div className="crearNuevo-container">
        <button
          onClick={() => createNewProvider()}
          className="points-btn-crear"
        >
          NUEVO PROVEEDOR
        </button>
      </div>

      {viewInsertProvider && (
        <div className="providers-modal-container">
          <div className="providers-modal">
            <form
              className="providers-form-container"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label>Nombre</label>
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
              <label>Direccion</label>
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
              <label>Ciudad</label>
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
              <label>Codigo Postal</label>
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
              <label>Razon Social</label>
              <input
                type="text"
                id="razonSocial"
                defaultValue={razonSocial}
                placeholder="Razon Social"
                onChange={handleOnChangeRazonSocial}
                {...register("razonSocial", {
                  required: true,
                })}
              />
              {errors.razonSocial?.type === "required" && (
                <span>Campo requerido</span>
              )}
              <label>Cif</label>
              <input
                type="text"
                id="cif"
                defaultValue={cif}
                placeholder="Cif"
                onChange={handleOnChangeCif}
                {...register("cif", {
                  required: true,
                })}
              />
              {errors.cif?.type === "required" && <span>Campo requerido</span>}
              {errorText && <span>{errorText}</span>}
              <div className="modal-actions">
                <button type="submit">CREAR</button>
                <button
                  type="button"
                  onClick={() => setViewInsertProvider(false)}
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editando && (
        <div className="providers-modal-container">
          <div className="providers-modal">
            <form
              className="providers-form-edit-container"
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
              <label>Razon Social</label>
              <input
                type="string"
                name="businessName"
                defaultValue={businessName}
                onChange={handleOnChangeBusinessName}
              />
              <label>Cif</label>
              <input
                type="string"
                name="cifValue"
                defaultValue={cifValue}
                onChange={handleOnChangeCifValue}
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
      <table className="providers-content-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Direccion</th>
            <th>Ciudad</th>
            <th>Codigo Postal</th>
            <th>Razon Social</th>
            <th>CIF</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {providers.map((element) => {
            return (
              <tr key={element.ID}>
                <td>{element.name}</td>
                <td>{element.address}</td>
                <td>{element.city}</td>
                <td>{element.postalCode}</td>
                <td>{element.businessName}</td>
                <td>{element.cif}</td>
                <td>
                  <button
                    onClick={() => edit(element)}
                    className="points-btn-editar"
                  ></button>
                  <button
                    onClick={() => deleteProviderFunction(element)}
                    className="providers-btn-eliminar"
                  ></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {viewErrorModal && (
        <div className="error-modal-container">
          <div className="error-modal">
            <h2>{errorText}</h2>
            <div className="modal-actions">
              <button
                onClick={() => {
                  setViewErrorModal(false);
                  setErrorText(null);
                }}
              >
                SALIR
              </button>
            </div>
          </div>
        </div>
      )}

      {viewDeleteModal && (
        <div className="error-modal-container">
          <div className="error-modal">
            <h2>¿Seguro desea elimar "{idDeletename}"?</h2>
            <div className="modal-actions">
              <button onClick={() => eliminando()}>ELIMNAR</button>
              <button onClick={() => setViewDeleteModal(false)}>
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Providers;
