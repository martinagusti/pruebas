import { useNavigate } from "react-router-dom";

import "./header.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Header({ setPage, page, viewOptionsModal, setViewOptionsModal }) {
  const { setToken, setUser, token } = useContext(AuthContext);
  const navigateTo = useNavigate();
  let user;
  if (token) {
    user = JSON.parse(localStorage.getItem("peixateriaUser"));
  }
  return (
    <div className="header-container">
      <div className="page">{page.toUpperCase()}</div>
      <div
        className={token ? "header-letter" : "header-user-img"}
        onClick={() => {
          navigateTo("/");
          setViewOptionsModal(true);
          setPage("home");
        }}
      >
        {token && <span>{user.name[0].toUpperCase()}</span>}
      </div>
    </div>
  );
}

export default Header;
