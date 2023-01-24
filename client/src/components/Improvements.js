import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import ImprovementModal from "./ImprovementModal";
import { Alert } from "../components/index.js";
import imageLike from "../assets/images/up.png";
import imageDislike from "../assets/images/down.png";
import { GrClose } from "react-icons/gr";

function Improvements() {
  const {
    isImprovements,
    showImprovements,
    hideImprovements,
    showingAlert,
    sendImprovementMail,
    user,
  } = useAppContext();
  const { email } = user;
  const handleLike = () => {
    sendImprovementMail(
      "Brugeren har trykket at han/hun synes godt om siden!",
      email,
      "like"
    );
  };

  return (
    <Wrapper>
      <h2>Hvad synes du om siden?</h2>
      <div className="btns">
        <img src={imageLike} alt="I like the site" onClick={handleLike} />
        <img
          src={imageDislike}
          alt="I dislike something"
          onClick={showImprovements}
        />
      </div>
      <div className="improvement">
        {isImprovements && <ImprovementModal />}
        {showingAlert && <Alert />}
      </div>
      {isImprovements && (
        <GrClose className="hide" onClick={hideImprovements} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 30px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #E2E2E2;

  h2 {
    text-align: center;
  }
  .btns {
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .hide:hover {
    cursor: pointer;
  }

  img {
    width: 150px;
    height: 150px;
    margin: 20px;
  }

  img:hover {
    cursor: pointer;
  }
`;

export default Improvements;
