import styled from 'styled-components'

const StyledComp = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: 0.4s ease-in-out all;;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: white;
    width: 90vw;
    height: 95vh;
    border-radius: 0.25rem;
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: #842029;
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: #627d98;
    padding: 1rem 0;
    text-transform: capitalize;
    transition: 0.4s ease-in-out all;;
  }
  .nav-link:hover {
    color: black;
  }
  .nav-link:hover .icon {
    color: #eab308;
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: 0.4s ease-in-out all;;
  }
  .active {
    color: black;
  }
  .active .icon {
    color: #eab308;
  }
`
export default StyledComp
