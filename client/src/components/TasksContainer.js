import Wrapper from "../assets/wrappers/TasksContainer";
import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Task from "./Task";
import Loading from "./Loading.js";
import { Link } from "react-router-dom";

function TasksContainer() {
  const {
    getTasks,
    tasks,
    isLoading,
    page,
    numberOfTasks,
    search,
    searchType,
    status,
    sort,
    searchStatus,
  } = useAppContext();

  useEffect(() => {
    getTasks();
  }, [search, searchType, searchStatus, sort]);

  if (isLoading) {
    return (
      <div>
        <Loading center />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h3>Du har ikke oprettet nogen opgaver.</h3>
        <Link to="/ny-opgave">Opret en opgave</Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        Du har {numberOfTasks} {tasks.length > 1 ? "opgaver" : "opgave"}
      </h5>
      <div className="tasks">
        {tasks.map((task) => {
          return <Task key={task._id} {...task} />;
        })}
      </div>
    </Wrapper>
  );
}

export default TasksContainer;
