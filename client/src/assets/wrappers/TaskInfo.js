import styled from 'styled-components'

const StyledComp = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: #829ab1;
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: 1px;;
  }
`
export default StyledComp
