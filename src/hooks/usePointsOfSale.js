import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getPointsOfSale } from "../services";

const usePointsOfSale = () => {
  const { setToken, setUser, token } = useContext(AuthContext);

  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("peixateriaUser"));
    if (user) {
      const loadPoints = async () => {
        try {
          setLoading(true);
          const data = await getPointsOfSale();
          setPoints(data);
        } catch (error) {
          console.log(error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      loadPoints();
    }
  }, [token]);

  return {
    points,
    setPoints,
    loading,
    error,
  };
};

export default usePointsOfSale;
