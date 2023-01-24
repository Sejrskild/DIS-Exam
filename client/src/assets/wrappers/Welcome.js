import styled from "styled-components";

const StyledComp = styled.main`
  nav {
    width: 90vw;
    max-width: 1120px;
    margin: 0 auto;
    height: 6rem;;
    display: flex;
    align-items: center;
  }

  .logo {
    height: 75px;
    width: 158px;
  }

  .page {
    min-height: calc(100vh - 6rem;);
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    display: flex;
    span {
      margin-left: 10px;
      color: #eab308;
    }

    .typewriter-cursor {
      color: #222;
    }
  }

  p {
    color: #486581;
  }

  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }

    .main-img {
      display: block;
    }
  }
`;

export default StyledComp;
