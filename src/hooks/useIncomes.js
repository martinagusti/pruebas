import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getIncomes } from "../services";

const useIncomes = () => {
  const { setToken, setUser, token } = useContext(AuthContext);

  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("peixateriaUser"));

    const loadIncomes = async () => {
      try {
        setLoading(true);
        const data = await getIncomes();
        setIncomes(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadIncomes();
  }, [token]);

  return {
    incomes,
    setIncomes,
  };
};

export default useIncomes;
