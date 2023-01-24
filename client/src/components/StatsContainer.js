import React from "react";
import { useAppContext } from "../context/appContext";
import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer.js";
import { FaCheck, FaCalendarCheck, FaBug } from "react-icons/fa";

function StatsContainer() {
  const { stats } = useAppContext();

  const userStats = [
    {
      title: "Udført",
      count: stats.udført || 0,
      icon: <FaCheck />,
      color: "#5fb258",
      bcg: "#5fb258",
    },
    {
      title: "Igangværende",
      count: stats.igangvaerende || 0,
      icon: <FaCalendarCheck />,
      color: "#e5b214",
      bcg: "#f3eacf",
    },
    {
      title: "Ikke startet",
      count: stats.ikkeStartet || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {userStats.map((stat, index) => {
        return <StatItem key={index} {...stat} />;
      })}
    </Wrapper>
  );
}

export default StatsContainer;
