import React from "react";
import { NavLink } from "react-router-dom";
import { IoBarChartSharp } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { FaWpforms } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";


const links = [
  {
    id: 1,
    text: "Statistik",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Alle opgaver",
    path: "alle-opgaver",
    icon: <BiTask />,
  },
  {
    id: 3,
    text: "Ny opgave",
    path: "ny-opgave",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "Profil",
    path: "profil",
    icon: <AiOutlineUser />,
  },
];

function Navlinks({ toggleSidebar }) {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, path, text, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className="nav-link"
            activeclassname="active"
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Navlinks;
