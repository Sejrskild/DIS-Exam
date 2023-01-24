import styled from 'styled-components'

const StyledComp = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    height: 120px;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 600px;
    border-top: 5px solid #eab308;
    border-bottom: 2px solid #eab308;
  }

  input:focus {
    outline-color: #eab308;
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: #eab308;
    cursor: pointer;
    letter-spacing: 1px;;
  }
`
export default StyledComp
