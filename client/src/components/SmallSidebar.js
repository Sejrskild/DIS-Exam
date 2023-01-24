import React from "react";
import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar.js";
import { useAppContext } from "../context/appContext.js";
import Navlinks from "./Navlinks.js";

function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <Navlinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
}

export default SmallSidebar;
