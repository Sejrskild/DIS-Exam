import styled from "styled-components";

const StyledComp = styled.main`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 600px;
    height: 120px;
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #627d98;
  }
  a {
    color: #eab308;
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default StyledComp;
