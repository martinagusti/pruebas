import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import usePointsOfSale from "./hooks/usePointsOfSale";
import PointsOfSale from "./pages/PointsOfSale";
import Providers from "./pages/Providers";
import useProviders from "./hooks/useProviders";
import Incomes from "./pages/Incomes";
import useIncomes from "./hooks/useIncomes";
import SideBar from "./components/SideBar";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";

function App() {
  const { setToken, setUser, token } = useContext(AuthContext);

  const { points, setPoints } = usePointsOfSale();
  const { providers, setProviders } = useProviders();

  const [viewOptionsModal, setViewOptionsModal] = useState(false);

  const [page, setPage] = useState("home");
  /* const { incomes, setIncomes } = useIncomes(); */

  return (
    <div className="app-container">
      <Header
        page={page}
        setPage={setPage}
        viewOptionsModal={viewOptionsModal}
        setViewOptionsModal={setViewOptionsModal}
      />
      {token && <SideBar page={page} setPage={setPage} />}
      <Routes>
        <Route
          path="/login"
          element={<Login page={page} setPage={setPage} />}
        />
        <Route
          path="/"
          element={
            <Home
              viewOptionsModal={viewOptionsModal}
              setViewOptionsModal={setViewOptionsModal}
            />
          }
        />
        <Route
          path="/pointsOfSale"
          element={
            <PointsOfSale
              points={points}
              setPoints={setPoints}
              page={page}
              setPage={setPage}
            />
          }
        />
        <Route
          path="/providers"
          element={
            <Providers providers={providers} setProviders={setProviders} />
          }
        />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;
