import styled from 'styled-components'

const StyledComp = styled.section`
  height: 6rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 1rem;
  .btn-container {
    background: #fef9c3;
    border-radius: 0.25rem;
  }
  .pageBtn {
    background: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: #eab308;
    transition: 0.4s ease-in-out all;;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  .active {
    background: #eab308;
    color: white;
  }
  .prev-btn,
  .next-btn {
    width: 100px;
    height: 40px;
    background: white;
    border-color: transparent;
    border-radius: 0.25rem;
    color: #eab308;
    text-transform: capitalize;
    letter-spacing: 1px;;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: 0.4s ease-in-out all;;
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: #eab308;
    color: white;
  }
`
export default StyledComp
