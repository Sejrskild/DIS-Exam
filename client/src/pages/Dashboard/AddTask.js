import React from "react";
import { FormRow, Alert, FormSelect } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddTask = () => {
  const {
    showingAlert,
    displayAlert,
    task,
    description,
    taskArea,
    taskType,
    taskTypes,
    status,
    statusOptions,
    isEditing,
    handleChange,
    clearValues,
    isLoading,
    createTask,
    editTask,
  } = useAppContext();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!task || !description || !taskArea) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editTask();
      return;
    }
    createTask();
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Rediger opgave" : "Ny opgave"}</h3>
        {showingAlert && <Alert />}
        <div className="form-center">
          {/* Task */}
          <FormRow
            type="text"
            name="task"
            labelText="Opgavens navn"
            value={task}
            handleChange={handleInput}
          />
          {/* Beskrivelse/Description */}
          <FormRow
            type="text"
            name="description"
            labelText="Yderligere information"
            value={description}
            handleChange={handleInput}
          />
          {/* Task */}
          <FormRow
            type="text"
            name="taskArea"
            labelText="Hvorhenne?"
            value={taskArea}
            handleChange={handleInput}
          />
          {/* Status */}
          <FormSelect
            labelText="Opgavens status"
            name="status"
            value={status}
            handleChange={handleInput}
            items={statusOptions}
          />
          {/* Opgavetype */}
          <FormSelect
            labelText="Opgavens type"
            name="taskType"
            value={taskType}
            handleChange={handleInput}
            items={taskTypes}
          />
          {/* Buttons */}
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={submitHandler}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-small loading-center"></div>
              ) : (
                isEditing ? 'Gem' : 'Opret'
              )}
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
              disabled={isEditing}
            >
              Nulstil
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddTask;
