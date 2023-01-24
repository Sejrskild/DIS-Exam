import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../assets/images/not-found.svg";
import StyledComp from "../assets/wrappers/ErrorPage";

function Error() {
  return (
    <StyledComp className="full-page">
      <div>
        <img src={errorImg} alt="Not found" />
        <h3>Hoovsa! Du er på vildspor</h3>
        <p>
          Linket kan være ødelagt, eller også er siden muligvis blevet fjernet.
          Kontrollér om det link, du prøver at åbne, er korrekt. (skud ud til Facebook)
        </p>
        <Link to='/'>Gå til forsiden</Link>
      </div>
    </StyledComp>
  );
}

export default Error;
