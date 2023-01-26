import React from "react";
import styled from "styled-components";
import { IoIosSend } from "react-icons/io";
import { useAppContext } from "../context/appContext";

function ImprovementModal() {
  const { user, sendImprovementMail } = useAppContext();
  const { email } = user;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const improvement = e.target[0].value;
    sendImprovementMail(improvement, email);
    e.target[0].value = "";
  };

  return (
    <>
      <Wrapper onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="Hvad kan forbedres?" />
        </div>
        <button type="submit">
          <IoIosSend />
        </button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
  padding: 30px;
  background-color: #E2E2E2;

  input {
    padding: 10px;
    font-size: 1.2rem;
    border: none;
    border-bottom: 1px solid #ccc;
    background-color: #E2E2E2;
  }

  button {
    background-color: #fff;
    border: none;
    font-size: 2rem;
    color: #facc15;
    margin: 10px;
    background-color: #E2E2E2;
  }

  button:hover {
    cursor: pointer;
    color: grey;
  }
`;

export default ImprovementModal;
