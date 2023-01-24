import React from "react";
import moment from "moment";
import "moment/locale/da";
import { useAppContext } from "../context/appContext";
import { FaBriefcase, FaCalendarAlt, FaTasks } from "react-icons/fa";
import { MdDelete, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import TaskInfo from "./TaskInfo.js";
import Wrapper from "../assets/wrappers/Task";

function Task({ task, createdAt, _id: id, description, status, type, area }) {
  let date = moment(createdAt).locale("da").format("MMM Do YYYY");
  const { setEditTask, deleteTask } = useAppContext();

  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          <FaTasks />{" "}
        </div>
        <div className="info">
          <h5>{task}</h5>
          <p>{description}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TaskInfo icon={<MdLocationOn />} text={area} />
          <TaskInfo icon={<FaCalendarAlt />} text={date} />
          <TaskInfo icon={<FaBriefcase />} text={type} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/ny-opgave"
              className="btn edit-btn"
              onClick={() => setEditTask(id)}
            >
              Rediger
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteTask(id)}
            >
              <MdDelete />
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}

export default Task;
