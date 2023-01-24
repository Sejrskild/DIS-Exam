import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, FormRow, Alert } from "../components";
import StyledComp from "../assets/wrappers/RegisterPage";
import { BsUnlock, BsLock } from "react-icons/bs";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  isRegistered: true,
};
function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const {
    isLoading,
    showingAlert,
    displayAlert,
    user,
    setupUser,
  } = useAppContext();

  // Changes between login and register
  const handleRegistered = () => {
    setValues({ ...values, isRegistered: !values.isRegistered });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isRegistered } = values;
    if (!password || !email || (!isRegistered && !name)) {
      displayAlert();
      return;
    }
    const user = { name, email, password };
    if (isRegistered) {
      setupUser({
        userLogin: user,
        route: "login",
        alertMessage: "Du er nu logget ind 🫡",
      });
    } else {
      setupUser({
        userLogin: user,
        route: "register",
        alertMessage: "Velkommen til!",
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <StyledComp className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        {values.isRegistered ? (
          <h3>
            {" "}
            <BsLock /> Login
          </h3>
        ) : (
          <h3>
            <BsUnlock /> Opret profil
          </h3>
        )}
        {showingAlert && <Alert />}
        {!values.isRegistered && (
          <FormRow
            name="name"
            labelText={'Navn'}
            type="text"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {values.isRegistered ? isLoading ? <div className="loading-small loading-center"></div> : 'Login' : "Opret profil"}
        </button>
        <p>
          {values.isRegistered ? "Ikke oprettet endnu?" : "Allerede oprettet?"}
          <button
            type="button"
            onClick={handleRegistered}
            className="member-btn"
          >
            {values.isRegistered ? "Opret dig nu" : "Login"}
          </button>
        </p>
      </form>
    </StyledComp>
  );
}

export default Register;
