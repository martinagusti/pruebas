import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getProviders } from "../services";

const useProviders = () => {
  const { setToken, setUser, token } = useContext(AuthContext);

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("peixateriaUser"));

    if (user) {
      const loadProviders = async () => {
        try {
          setLoading(true);
          const data = await getProviders();
          setProviders(data);
        } catch (error) {
          console.log(error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      loadProviders();
    }
  }, [token]);

  return {
    providers,
    setProviders,
  };
};

export default useProviders;
