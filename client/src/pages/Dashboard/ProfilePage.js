import React, { useState } from "react";
import { FormRow, Alert } from "../../components/index.js";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function ProfilePage() {
  const {
    user,
    showingAlert,
    displayAlert,
    updateUser,
    isLoading,
    deleteUser,
  } = useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [area, setArea] = useState(user?.area);
  const [advanced, setAdvanced] = useState(false);

  const handleAdvanced = () => {
    setAdvanced(!advanced);
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Slet bruger",
      message:
        "Er du sikker på du vil slette din bruger? Dette kan ikke fortrydes!",
      buttons: [
        {
          label: "Ja",
          onClick: () => deleteUser(),
        },
        {
          label: "Nej",
          onClick: () => {},
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !lastName || !email || !area) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, area });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Indstillinger & Profil</h3>
        {showingAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            labelText="Navn"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="Efternavn"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            labelText="Område"
            value={area}
            handleChange={(e) => setArea(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="loading-small loading-center"></div>
            ) : (
              "Gem Ændringer"
            )}
          </button>
        </div>
      </form>
      <button className="show-more" onClick={handleAdvanced}>
        Avancerede indstillinger
      </button>
      {advanced && (
        <div className="advanced-btns">
          <button className="btn btn-danger" onClick={handleDelete}>
            Slet konto
          </button>
        </div>
      )}
    </Wrapper>
  );
}

export default ProfilePage;
