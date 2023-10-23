import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthproviderComponent = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("peixateriaToken"))
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("peixateriaUser"))
  );

  /* useEffect(() => {
    localStorage.setItem("peixateriaToken", JSON.stringify(token));
    localStorage.setItem("peixateriaUser", JSON.stringify(user));
  }, [token]);
 */
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
