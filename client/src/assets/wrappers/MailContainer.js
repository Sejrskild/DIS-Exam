import styled from "styled-components";

const StyledComp = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: auto;
  span {
    color: #eab308;
  }
  button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #eab308;
    color: white;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #ca8a04;
      cursor: pointer;
    }
  }

  .alert {
    margin-top: 20px;
    padding: 10px 20px;
  }
`;

export default StyledComp;
