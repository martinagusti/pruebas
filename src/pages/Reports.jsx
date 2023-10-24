import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import "./reports.css";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";
import useIncomes from "../hooks/useIncomes";
import LinesChart from "../components/LinesChart";
import useExpenses from "../hooks/useExpenses";
import usePointsOfSale from "../hooks/usePointsOfSale";
import { getExpenses, getIncomes } from "../services";

function Reports() {
  const { setToken, setUser, token } = useContext(AuthContext);

  const { incomes, setIncomes } = useIncomes();
  const { expenses, setExpenses } = useExpenses();
  const { points, setPoints } = usePointsOfSale();

  const date = new Date();

  const [age, setAge] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [point, setPoint] = useState();
  const [incomesFiltered, setIncomesFiltered] = useState();
  const [expensesFiltered, setExpensesFiltered] = useState();

  let arrayIngresosMensual = [];

  for (let i = 1; i < 32; i++) {
    arrayIngresosMensual.push(
      incomes
        .filter((element) => {
          const date = new Date(element.date);
          if (
            date.getDate() == i &&
            date.getMonth() == month &&
            date.getFullYear() == age
          ) {
            return element.amount;
          }
        })

        .reduce((acumulador, numero) => {
          return acumulador + parseFloat(numero.amount);
        }, 0)
    );
  }

  let arrayIngresos = [];
  for (let i = 0; i < 12; i++) {
    arrayIngresos.push(
      incomes
        .filter((element) => {
          const date = new Date(element.date);
          if (date.getMonth() == i && date.getFullYear() == age) {
            return element.amount;
          }
        })

        .reduce((acumulador, numero) => {
          return acumulador + parseFloat(numero.amount);
        }, 0)
    );
  }

  let arrayEgresosMensual = [];

  for (let i = 1; i < 32; i++) {
    arrayEgresosMensual.push(
      expenses
        .filter((element) => {
          const date = new Date(element.expenseDate);
          if (
            date.getDate() == i &&
            date.getMonth() == month &&
            date.getFullYear() == age
          ) {
            return element.amount;
          }
        })

        .reduce((acumulador, numero) => {
          return acumulador + parseFloat(numero.amount);
        }, 0)
    );
  }

  let arrayEgresos = [];
  for (let i = 0; i < 12; i++) {
    arrayEgresos.push(
      expenses
        .filter((element) => {
          const date = new Date(element.expenseDate);
          if (date.getMonth() == i && date.getFullYear() == age) {
            return element.amount;
          }
        })

        .reduce((acumulador, numero) => {
          return acumulador + parseFloat(numero.amount);
        }, 0)
    );
  }

  let arrayResultadoAnual = [];
  for (let i = 0; i < 12; i++) {
    arrayResultadoAnual.push(arrayIngresos[i] - arrayEgresos[i]);
  }

  let arrayResultadoMensual = [];
  for (let i = 0; i < 32; i++) {
    arrayResultadoMensual.push(
      arrayIngresosMensual[i] - arrayEgresosMensual[i]
    );
  }

  let arrayAños = [];
  const thisYear = new Date();
  for (let i = thisYear.getFullYear(); i >= 2020; i--) {
    arrayAños.push(i);
  }

  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let dias = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  let midata = {
    labels: month !== "" ? dias : meses,
    datasets: [
      {
        label: "Ingresos",
        data: month !== "" ? arrayIngresosMensual : arrayIngresos,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(0,128,0)",
        backgroundColor: "rgb(0,128,0, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgb(0,128,0)",
        pointBackgroundColor: "rgb(0,128,0)",
      },
    ],
  };

  let midata2 = {
    labels: month !== "" ? dias : meses,
    datasets: [
      {
        label: "Egresos",
        data: month !== "" ? arrayEgresosMensual : arrayEgresos,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgb(255,99,132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgb(255,99,132)",
        pointBackgroundColor: "rgb(255,99,132)",
      },
    ],
  };

  let midata3 = {
    labels: month !== "" ? dias : meses,
    datasets: [
      {
        label: "Resultados",
        data: month !== "" ? arrayResultadoMensual : arrayResultadoAnual,
        tension: 0.5,
        fill: true,
        borderColor: "rgb(0,0,132)",
        backgroundColor: "rgb(0,0,132, 0.5)",
        pointRadius: 5,
        pointBorderColor: "rgb(0,0,132)",
        pointBackgroundColor: "rgb(0,0,132)",
      },
    ],
  };

  let ingresos2023 = arrayIngresos.reduce((acumulador, numero) => {
    return acumulador + parseFloat(numero);
  }, 0);

  console.log(
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(ingresos2023)
  );

  let ingresosMensual2023 = arrayIngresosMensual.reduce(
    (acumulador, numero) => {
      return acumulador + parseFloat(numero);
    },
    0
  );

  let egresos2023 = arrayEgresos.reduce((acumulador, numero) => {
    return acumulador + parseFloat(numero);
  }, 0);

  let egresosMensual2023 = arrayEgresosMensual.reduce((acumulador, numero) => {
    return acumulador + parseFloat(numero);
  }, 0);

  const filtrar = (e) => {
    e.preventDefault();
    console.log(e.target.age.value);
  };

  const handleOnChangeAge = (e) => {
    setAge(e.target.value);
  };

  const handleOnChangeMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleOnChangePointOfSale = async (e) => {
    try {
      if (e.target.value == "") {
        const allIncomes = await getIncomes();
        const allExpenses = await getExpenses();
        setIncomes(allIncomes);
        setExpenses(allExpenses);
        return;
      }
      const allIncomes = await getIncomes();
      const incomesFilteredByPoint = allIncomes.filter((element) => {
        return element.name == e.target.value;
      });
      setIncomes(incomesFilteredByPoint);

      const allExpenses = await getExpenses();
      const expensesFilteredByPoint = allExpenses.filter((element) => {
        return element.pointName == e.target.value;
      });
      setExpenses(expensesFilteredByPoint);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reports-container">
      <div className="reports-filter-container">
        <form
          onSubmit={(event) => {
            filtrar(event);
          }}
        >
          <select
            name="age"
            value={age}
            onChange={handleOnChangeAge}
            className="select-age"
          >
            {arrayAños.map((element, index) => {
              return (
                <option key={index} value={element}>
                  {element}
                </option>
              );
            })}
          </select>

          <select
            name="month"
            value={month}
            onChange={handleOnChangeMonth}
            className="select-age"
          >
            <option value="">Anual</option>
            <option value="0">Enero</option>
            <option value="1">Febrero</option>
            <option value="2">Marzo</option>
            <option value="3">Abril</option>
            <option value="4">Mayo</option>
            <option value="5">Junio</option>
            <option value="6">Julio</option>
            <option value="7">Agosto</option>
            <option value="8">Septiembre</option>
            <option value="9">Octubre</option>
            <option value="10">Noviembre</option>
            <option value="11">Diciembre</option>
          </select>

          <select
            name="pointOfSale"
            value={point}
            onChange={handleOnChangePointOfSale}
            className="select-age"
          >
            <option value="">Punto de Venta</option>
            {points.map((element, index) => {
              return (
                <option key={index} value={element.name}>
                  {element.name}
                </option>
              );
            })}
          </select>
        </form>
      </div>
      <div className="reports-graficos-container">
        <div className="ingresos-gastos-graficos">
          <div className="ingresos">
            <div className="card-ingresos">
              <h4>{`INGRESOS TOTALES`}</h4>
              <h1>{` ${
                month !== ""
                  ? new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(ingresosMensual2023)
                  : new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(ingresos2023)
              }`}</h1>
            </div>

            <LinesChart midata={midata} />
          </div>
          <div className="egresos">
            <div className="card-egresos">
              <h4>{`GASTOS TOTALES`}</h4>
              <h1>{`${
                month !== ""
                  ? new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(egresosMensual2023)
                  : new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(egresos2023)
              }`}</h1>
            </div>

            <LinesChart midata={midata2} />
          </div>
        </div>

        <div className="total">
          <div className="card-total">
            <h4>{`RESULTADO`}</h4>
            <h1>{`${new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(
              (month !== "" ? ingresosMensual2023 : ingresos2023) -
                (month !== "" ? egresosMensual2023 : egresos2023)
            )}`}</h1>
          </div>
          <LinesChart midata={midata3} />
        </div>
      </div>
    </div>
  );
}

export default Reports;
