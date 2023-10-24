import { useState, useRef } from "react";
import useExpenses from "../hooks/useExpenses";
import "./expenses.css";
import { useForm } from "react-hook-form";
import useProviders from "../hooks/useProviders";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../services";
import usePointsOfSale from "../hooks/usePointsOfSale";

function Expenses() {
  const { expenses, setExpenses, error, loading } = useExpenses();
  const { providers, setProviders } = useProviders();
  const { points, setPoints } = usePointsOfSale();

  const [idPuntoVenta, setIdPuntoVenta] = useState("");

  const [desde, setDesde] = useState();
  const [hasta, setHasta] = useState();
  const [proveedores, setProveedores] = useState("");
  const [viewInsertExpense, setViewInsertExpense] = useState(false);
  const [idProvider, setIdProvider] = useState();
  const [amount, setAmount] = useState();
  const [concept, setConcept] = useState("");
  const [numFactura, setNumFactura] = useState("");
  const [fechaFactura, setFechaFactura] = useState();
  const [status, setStatus] = useState("pagado");
  const [fechaPago, setFechaPago] = useState();
  const [fileId, setFileId] = useState();
  const [fileName, setFileName] = useState("");
  const [viewFileModal, setViewFileModal] = useState(false);
  const [estado, setEstado] = useState(null);
  const [viewEditModal, setViewEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [deleteIdName, setDeleteIdName] = useState();

  const [editId, setEditId] = useState();
  const [editPoint, setEditPoint] = useState();
  const [editProvider, setEditProvider] = useState();
  const [editNumFactura, setEditNumFactura] = useState();
  const [editFechaFactura, setEditFechaFactura] = useState();
  const [editAmount, setEditAmount] = useState();
  const [editStatus, setEditStatus] = useState();
  const [editFechaPago, setEditFechaPago] = useState();
  const [editConcept, setEditConcept] = useState();
  const [editIdPoint, setEditIdPoint] = useState();
  const [editIdProvider, setEditIdProvider] = useState();

  const [errorText, setErrorText] = useState();
  const [totalFiltrado, setTotalFiltrado] = useState();

  const form = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      idProvider: null,
      numFactura: null,
      fechaFactura: null,
      amount: null,
      status: null,
      concept: null,
      fechaPago: null,
    },
  });

  const providersOrdered = providers.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const pointsOrdered = points.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  expenses.sort((a, b) => {
    /* const date1 = new Date(a.date);
    const date2 = new Date(b.date);
    return date2.getTime() - date1.getTime(); */
    return b.id - a.id;
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    /*   const formData = new FormData(e.target);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson); */

    try {
      console.log(data);
      if (data.status == "no pagado") {
        data.fechaPago = null;
      }

      console.log(data);

      const {
        idPoint,
        idProvider,
        amount,
        fechaFactura,
        fechaPago,
        numFactura,
        status,
        concept,
      } = data;

      const created = await createExpense(
        idPoint,
        idProvider,
        amount,
        fechaFactura,
        fechaPago,
        numFactura,
        status,
        concept
      );

      const allExpenses = await getExpenses();
      reset();
      setExpenses(allExpenses);

      setTimeout(() => {
        setViewInsertExpense(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.error);
    }
  };

  const buscarRangoFecha = async (e) => {
    e.preventDefault();

    let allExpenses = await getExpenses();

    if (idPuntoVenta !== "") {
      allExpenses = allExpenses.filter((element) => {
        return element.idPointOfSale == idPuntoVenta;
      });
    }

    let filtered = allExpenses.filter((element) => {
      return element.providerName
        .toLowerCase()
        .includes(proveedores?.toLowerCase());
    });
    console.log(estado);
    if (estado === "pagado") {
      filtered = filtered.filter((element) => {
        return element.status === "pagado";
      });
    }

    if (estado === "no pagado") {
      filtered = filtered.filter((element) => {
        return element.status === "no pagado";
      });
    }
    console.log(filtered);

    if (proveedores !== "") {
      setExpenses(
        filtered.filter((element) => {
          const dateDesde = new Date(e.target.desde.value);
          const dateHasta = new Date(e.target.hasta.value);

          const dateElement = new Date(element.date);

          return (
            dateElement.getTime() > dateDesde.getTime() - 86401 &&
            dateElement.getTime() < dateHasta.getTime() + 86400
          );
        })
      );
      const totalEgresos = filtered
        .filter((element) => {
          const dateDesde = new Date(e.target.desde.value);
          const dateHasta = new Date(e.target.hasta.value);

          const dateElement = new Date(element.date);

          return (
            dateElement.getTime() > dateDesde.getTime() - 86401 &&
            dateElement.getTime() < dateHasta.getTime() + 86400
          );
        })
        .reduce((acumulador, numero) => {
          return acumulador + parseFloat(numero.amount);
        }, 0);

      setTotalFiltrado(
        new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(totalEgresos)
      );
    } else {
      /* let allExpenses = await getExpenses(); */

      if (estado === "pagado") {
        allExpenses = allExpenses.filter((element) => {
          return element.status === "pagado";
        });
      }

      if (estado === "no pagado") {
        allExpenses = allExpenses.filter((element) => {
          return element.status === "no pagado";
        });
      }
      setExpenses(
        allExpenses.filter((element) => {
          const dateDesde = new Date(e.target.desde.value);
          const dateHasta = new Date(e.target.hasta.value);

          const dateElement = new Date(element.date);

          return (
            dateElement.getTime() > dateDesde.getTime() - 86401 &&
            dateElement.getTime() < dateHasta.getTime() + 86400
          );
        })
      );
      const totalEgresos = allExpenses
        .filter((element) => {
          const dateDesde = new Date(e.target.desde.value);
          const dateHasta = new Date(e.target.hasta.value);

          const dateElement = new Date(element.date);

          return (
            dateElement.getTime() > dateDesde.getTime() - 86401 &&
            dateElement.getTime() < dateHasta.getTime() + 86400
          );
        })

        .reduce((acumulador, numero) => {
          return acumulador + parseFloat(numero.amount);
        }, 0);

      setTotalFiltrado(
        new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(totalEgresos)
      );
    }
  };

  const handleOnChangeSearchProveedores = (e) => {
    setProveedores(e.target.value);
  };

  const handleOnChangeIdProvider = (e) => {
    setIdProvider(e.target.value);
  };

  const handleOnChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleOnChangeConcept = (e) => {
    setConcept(e.target.value);
  };

  const handleOnChangeNumFactura = (e) => {
    setNumFactura(e.target.value);
  };

  const handleOnChangeStatus = (e) => {
    setStatus(e.target.value);
    console.log(status);
  };

  const handleOnChangeFechaFactura = (e) => {
    setFechaFactura(e.target.value);
  };

  const handleOnChangeFileName = (e) => {
    setFileName(e.target.value);
  };

  const handleOnChangeEstado = (e) => {
    setEstado(e.target.value);
  };

  const createNewExpense = () => {
    setViewInsertExpense(true);
  };

  const uploadDocument = (element) => {
    console.log(element.id);
    setViewFileModal(true);
    setFileId(element.id);
  };

  const cargarArchivo = async () => {
    const date = new Date();

    const arr = fileName.split("\\");

    setTimeout(async () => {
      const data = await getExpenses();
      setViewFileModal(false);
      setExpenses(data);
    }, 800);

    /* setViewFileModal(false); */
  };

  const deleteExpenseFunction = async () => {
    try {
      const deleted = await deleteExpense(deleteId);
      console.log(deleted);
      setExpenses(
        expenses.filter((element) => {
          return element.id !== deleteId;
        })
      );
      setDeleteModal(false);
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.error);
    }
  };

  const editSave = async (e) => {
    e.preventDefault();

    const edited = await updateExpense(
      editIdPoint,
      editIdProvider,
      e.target.editNumFactura.value,
      e.target.editFechaFactura.value,
      e.target.editAmount.value,
      e.target.editStatus.value,
      e.target.editFechaPago?.value,
      e.target.editConcept.value,
      editId
    );

    setExpenses(await getExpenses());
    setViewEditModal(false);
  };

  const edit = (element) => {
    setEditPoint(element.pointName);
    setEditProvider(element.providerName);
    setEditId(element.id);
    setEditIdPoint(element.idPointOfSale);
    setEditIdProvider(element.idProvider);
    setEditNumFactura(element.code);

    const fechaFactura = new Date(element.expenseDate);

    setEditFechaFactura(
      `${fechaFactura.getFullYear()}-${(fechaFactura.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${fechaFactura
        .getDate()
        .toString()
        .padStart(2, "0")}`
    );
    setEditAmount(element.amount);
    setEditStatus(element.status);

    const fechaPago = new Date(element.paydate);

    setEditFechaPago(
      `${fechaPago.getFullYear()}-${(fechaPago.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${fechaPago.getDate().toString().padStart(2, "0")}`
    );

    setEditConcept(element.concept);
    setViewEditModal(true);
  };

  const handleOnChangeEditPoint = (e) => {
    setEditPoint(e.target.value);
    const elemento = points.filter((element) => {
      return element.name === e.target.value;
    });

    setEditIdPoint(elemento[0].ID);
  };

  const handleOnChangeEditProvider = (e) => {
    setEditProvider(e.target.value);
    const elemento = providers.filter((element) => {
      return element.name === e.target.value;
    });

    setEditIdProvider(elemento[0].ID);
  };

  const handleOnChangeEditConcept = (e) => {
    setEditConcept(e.target.value);
  };

  const handleOnChangeIdPuntoVenta = (e) => {
    setIdPuntoVenta(e.target.value);
  };

  const handleOnChangeEditAmount = (e) => {
    setEditAmount(e.target.value);
  };

  const handleOnChangeEditNumFactura = (e) => {
    setEditNumFactura(e.target.value);
  };

  const handleOnChangeEditFechaFactura = (e) => {
    setEditFechaFactura(e.target.value);
  };

  const handleOnChangeEditStatus = (e) => {
    setEditStatus(e.target.value);
  };

  const handleOnChangeEditFechaPago = (e) => {
    setEditFechaPago(e.target.value);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div className="expenses-container">
      <div className="filtros-container">
        <form
          onSubmit={(event) => {
            buscarRangoFecha(event);
          }}
        >
          <div className="filtros-fecha-container">
            <label>Desde</label>
            <input
              type="date"
              defaultValue={desde}
              name="desde"
              className="input-date"
            />
            <label>Hasta</label>

            <input
              type="date"
              defaultValue={hasta}
              name="hasta"
              className="input-date"
            />
          </div>

          <div>
            <input
              type="text"
              id="proveedores"
              defaultValue={proveedores}
              placeholder="Proveedor"
              onChange={handleOnChangeSearchProveedores}
              className="income-search-input"
            />
            <select
              className="input-search-estado"
              name="idPuntoVenta"
              id="lang"
              onChange={handleOnChangeIdPuntoVenta}
              value={idPuntoVenta}
            >
              <option value="">Punto de Venta</option>

              {pointsOrdered.map((element, index) => {
                return (
                  <option value={element.ID} key={index}>
                    {element.name}
                  </option>
                );
              })}
            </select>
            <select
              name="estado"
              id="lang"
              onClick={handleOnChangeEstado}
              className="input-search-estado"
            >
              <option value={null}>Todos</option>
              <option value="pagado">Pagado</option>
              <option value="no pagado">No Pagado</option>
            </select>
            <button type="submit" className="points-lupa-btn"></button>
          </div>
        </form>
      </div>

      <div className="crearNuevo-container">
        <button onClick={() => createNewExpense()} className="points-btn-crear">
          NUEVO GASTO
        </button>
      </div>

      <div className="egresos-total-filtrado">{totalFiltrado}</div>

      {viewInsertExpense && (
        <div className="incomes-modal-container">
          <div className="incomes-modal">
            <form
              className="incomes-form-container"
              method="post"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="modal-selects-container">
                <div className="inputs-container">
                  <select
                    name="idPoint"
                    id="lang"
                    /*  onChange={handleOnChangeIdProvider}
                    value={idProvider} */
                    {...register("idPoint", {
                      required: true,
                    })}
                  >
                    <option value="">Punto Venta</option>

                    {pointsOrdered.map((element, index) => {
                      return (
                        <option value={element.ID} key={index}>
                          {element.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.idPoint?.type === "required" && (
                    <span>Campo requerido</span>
                  )}
                  <select
                    name="idProvider"
                    id="lang"
                    /*  onChange={handleOnChangeIdProvider}
                    value={idProvider} */
                    {...register("idProvider", {
                      required: true,
                    })}
                  >
                    <option value="">Proveedor</option>

                    {providersOrdered.map((element, index) => {
                      return (
                        <option value={element.ID} key={index}>
                          {element.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.idProvider?.type === "required" && (
                    <span>Campo requerido</span>
                  )}
                </div>
              </div>

              <input
                type="text"
                step="any"
                id="numFactura"
                /* defaultValue={numFactura} */
                placeholder="Factura Numero"
                /*  onChange={handleOnChangeNumFactura} */
                {...register("numFactura", {
                  required: true,
                })}
              />
              {errors.numFactura?.type === "required" && (
                <span>Campo requerido</span>
              )}

              <label>Fecha Factura</label>
              <input
                type="date"
                id="fechaFactura"
                /*  defaultValue={fechaFactura} */
                name="desde"
                className="input-date"
                /* onChange={handleOnChangeFechaFactura} */
                {...register("fechaFactura", {
                  required: true,
                })}
              />
              {errors.fechaFactura?.type === "required" && (
                <span>Campo requerido</span>
              )}

              <input
                type="number"
                step="any"
                id="amount"
                /*  defaultValue={amount} */
                placeholder="Importe"
                /* onChange={handleOnChangeAmount} */
                {...register("amount", {
                  required: true,
                })}
              />
              {errors.amount?.type === "required" && (
                <span>Campo requerido</span>
              )}
              <label>Estado</label>
              <select
                name="status"
                id="lang"
                /*  onChange={handleOnChangeStatus} */
                onClick={handleOnChangeStatus}
                /*  defaultValue={status} */
                {...register("status", {
                  required: true,
                })}
              >
                <option value="pagado">Pagado</option>
                <option value="no pagado">No Pagado</option>
              </select>
              {errors.status?.type === "required" && (
                <span>Campo requerido</span>
              )}

              {status === "pagado" && (
                <div className="fechaPago-container">
                  <label>Fecha Pago</label>
                  <input
                    id="fechaPago"
                    type="date"
                    /*  defaultValue={fechaPago} */
                    name="desde"
                    className="input-date"
                    {...register("fechaPago", {
                      required: true,
                    })}
                  />
                  {status === "pagado" &&
                    errors.fechaPago?.type === "required" && (
                      <span>Campo requerido</span>
                    )}
                </div>
              )}

              <input
                type="text"
                id="concept"
                /* defaultValue={concept} */
                placeholder="Concepto"
                /* onChange={handleOnChangeConcept} */
                {...register("concept", {
                  required: true,
                })}
              />
              {errors.concept?.type === "required" && (
                <span>Campo requerido</span>
              )}
              {errorText && <span>{errorText}</span>}
              <div className="modal-actions">
                <button type="submit">CREAR</button>
                <button
                  type="submit"
                  onClick={() => {
                    setViewInsertExpense(false);
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

      <div className="box-table-content">
        <table className="incomes-content-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Punto Venta</th>
              <th>Proveedor</th>
              <th>N° Factura</th>
              <th>Fecha Factura</th>
              <th>Importe</th>
              <th>Estado</th>
              <th>Fecha de pago</th>
              <th>Concepto</th>
              <th>Documento</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((element) => {
              const date = new Date(element.expenseDate);
              const expenseDate = new Date(element.expenseDate);
              const fechaPago = new Date(element.paydate);

              return (
                <tr key={element.id}>
                  <td>{`${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`}</td>
                  <td>{element.pointName}</td>
                  <td>{element.providerName}</td>
                  <td>{element.code}</td>
                  <td>{`${expenseDate.getDate()}/${
                    expenseDate.getMonth() + 1
                  }/${expenseDate.getFullYear()}`}</td>

                  <td>
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(element.amount)}
                  </td>
                  <td>{element.status}</td>
                  {element.paydate && (
                    <td>{`${fechaPago?.getDate()}/${
                      fechaPago?.getMonth() + 1
                    }/${fechaPago?.getFullYear()}`}</td>
                  )}
                  {!element.paydate && <td>{}</td>}
                  <td>{element.concept}</td>
                  <td>
                    {
                      /* {element.document} */ <a
                        href={`https://pruebasgestion.blob.core.windows.net/imagenes/${element.document}`}
                        download="archivo.txt"
                      >
                        {element.document}
                      </a>
                    }
                  </td>

                  <td>
                    <button
                      onClick={() => uploadDocument(element)}
                      className="incomes-btn-upload"
                    ></button>
                    <button
                      onClick={() => edit(element)}
                      className="points-btn-editar"
                    ></button>
                    <button
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteId(element.id);
                        setDeleteIdName({
                          name: element.code,
                          amount: element.amount,
                        });
                      }}
                      className="providers-btn-eliminar"
                    ></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {viewFileModal && (
        <div className="uploadFile-modal-container">
          <div className="uploadFile-modal">
            <form
              onSubmit={() => cargarArchivo()}
              action={`${
                import.meta.env.VITE_BACKEND_URL
              }/expenses/files/${fileId}`}
              target="_blank"
              method="post"
              encType="multipart/form-data"
            >
              <input
                type="file"
                name="avatar"
                id=""
                /* defaultValue={fileName} */
                onChange={handleOnChangeFileName}
              />
              <div className="modal-actions">
                <button type="submit">ENVIAR</button>
                <button type="button" onClick={() => setViewFileModal(false)}>
                  SALIR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewEditModal && (
        <div className="edit-modal-container">
          <div className="edit-modal">
            <form
              className="incomes-form-container"
              method="post"
              onSubmit={(event) => editSave(event)}
            >
              <select
                name="editIdPoint"
                id="lang"
                onChange={handleOnChangeEditPoint}
                defaultValue={editPoint}
              >
                {pointsOrdered.map((element, index) => {
                  return (
                    <option defaultValue={element.ID} key={index}>
                      {element.name}
                    </option>
                  );
                })}
              </select>

              <select
                name="editIdProvider"
                id="lang"
                onChange={handleOnChangeEditProvider}
                defaultValue={editProvider}
              >
                {providersOrdered.map((element, index) => {
                  return (
                    <option defaultValue={element.ID} key={index}>
                      {element.name}
                    </option>
                  );
                })}
              </select>

              <input
                name="editNumFactura"
                type="text"
                id="concept"
                defaultValue={editNumFactura}
                placeholder="Concepto"
                onChange={handleOnChangeEditNumFactura}
              />

              <input
                name="editFechaFactura"
                type="date"
                id="fechaFactura"
                defaultValue={editFechaFactura}
                placeholder="Fecha Factura"
                onChange={handleOnChangeEditFechaFactura}
              />

              <input
                name="editAmount"
                type="number"
                step="any"
                id="amount"
                defaultValue={editAmount}
                placeholder="Importe"
                onChange={handleOnChangeEditAmount}
              />

              <select
                name="editStatus"
                id="lang"
                onChange={handleOnChangeEditStatus}
                defaultValue={editStatus}
              >
                {/* <option value="">Estado</option> */}
                <option value="pagado">Pagado</option>
                <option value="no pagado">No Pagado</option>
              </select>

              {/*  <input
                name="editStatus"
                type="text"
                id="status"
                defaultValue={editStatus}
                placeholder="Estado"
                onChange={handleOnChangeEditStatus}
              /> */}

              {editStatus == "pagado" && (
                <input
                  name="editFechaPago"
                  type="date"
                  id="fechaPago"
                  defaultValue={editFechaPago}
                  placeholder="Estado"
                  onChange={handleOnChangeEditFechaPago}
                />
              )}

              <input
                name="editConcept"
                type="text"
                id="concept"
                defaultValue={editConcept}
                placeholder="Concepto"
                onChange={handleOnChangeEditConcept}
              />
              {errorText && <span>{errorText}</span>}
              <div className="modal-actions">
                <button type="submit">GUARDAR</button>
                <button
                  type="button"
                  onClick={() => {
                    setViewEditModal(false);
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

      {deleteModal && (
        <div className="income-delete-modal-container">
          <div className="income-delete-modal">
            <h2>
              ¿Seguro desea eliminar factura {deleteIdName.name} por €
              {deleteIdName.amount}?{" "}
            </h2>
            {errorText && <span>{errorText}</span>}
            <div className="modal-actions">
              <button onClick={() => deleteExpenseFunction()}>ACEPTAR</button>
              <button
                onClick={() => {
                  setDeleteModal(false);
                  setErrorText(null);
                }}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expenses;
