import styled from "styled-components";

const StyledComp = styled.article`
  background: white;
  border-radius: 0.25rem;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  margin: 10px;

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #d9e2ec;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: #eab308;
    border-radius: 0.25rem;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: white;
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
      text-transform: uppercase;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: #7a869a;
      letter-spacing: 1px;
    }
  }
  .Udført {
    background: #afe1af;
    color: #376937;
  }
  .Igangværende {
    background: #facc15;
    color: #a16207;
  }
  .Ikke {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }

  .status {
    border-radius: 0.25rem;
    text-transform: capitalize;
    letter-spacing: 1px;
    text-align: center;
    width: 120px;
    height: 30px;
    margin: 10px;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: 1px;
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: #0f5132;
    background: #d1e7dd;
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: #842029;
    background: #f8d7da;
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default StyledComp;
