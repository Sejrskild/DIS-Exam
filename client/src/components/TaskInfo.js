import React from "react";
import Wrapper from "../assets/wrappers/TaskInfo.js";

function TaskInfo({ icon, text }) {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
}

export default TaskInfo;
