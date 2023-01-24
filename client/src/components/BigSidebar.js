import React from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/BigSidebar.js";
import Navlinks from "../components/Navlinks";
import Logo from "../components/Logo.js";

function BigSidebar() {
  const {showSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  );
}

export default BigSidebar;
