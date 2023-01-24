import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext.js";
import { StatsContainer, Loading, Charts, Improvements } from "../../components";

function Stats() {
  const { showStats, isLoading, monthlyTasks } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      <Improvements />
    </>
  );
}

export default Stats;
