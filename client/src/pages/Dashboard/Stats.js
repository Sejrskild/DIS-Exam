import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext.js";
import { StatsContainer, Loading, Improvements } from "../../components";

function Stats() {
  const { showStats, isLoading } = useAppContext();

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
