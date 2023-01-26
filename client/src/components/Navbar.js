import React from "react";
import Wrapper from "../assets/wrappers/Navbar.js";
import { RiMenu4Line } from "react-icons/ri";
import { useAppContext } from "../context/appContext.js";
import { Logo } from "../components";
import { CiLogout } from "react-icons/ci";

function Navbar() {
  const { toggleSidebar, logout, user } = useAppContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <RiMenu4Line />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">
            {" "}
            <span className="line">Dashboard</span> Instrumentbræt
          </h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={logout}>
            <CiLogout />
            {user && "Logud"}
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Navbar;
