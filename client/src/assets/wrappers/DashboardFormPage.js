import styled from "styled-components";

const StyledComp = styled.section`
  border-radius: 0.25rem;
  width: 100%;
  background: white;
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: #627d98;
  }
  .clear-btn:hover {
    background: #9fb3c8;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }

  .show-more {
    margin-top: 0.5rem;
    background: transparent;
    border: none;
    text-decoration: underline;
    color: #627d98;
    &:hover {
      color: #9fb3c8;
      cursor: pointer;
    }
  }

  .advanced-btns {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 0.5rem;
    button {
      margin-top: 0.5rem;
      width: 20%;
      padding: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default StyledComp;
