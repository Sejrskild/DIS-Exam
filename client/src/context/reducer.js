import {
  DISPLAY_ALERT,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DEFAULT_TASK,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  GET_TASKS_BEGIN,
  GET_TASKS_SUCCESS,
  EDIT_TASK,
  DELETE_TASK_BEGIN,
  EDIT_TASK_BEGIN,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  CLEAR_FILTERS,
  SEND_EMAIL_BEGIN,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SEND_IMPROVEMENT_BEGIN,
  SEND_IMPROVEMENT_SUCCESS,
  SEND_IMPROVEMENT_ERROR,
  SHOW_IMPROVEMENTS,
  HIDE_IMPROVEMENTS,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showingAlert: true,
      alertType: "danger",
      alertText: "Udfyld alle felterne.",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return { ...state, showingAlert: false, alertType: "", alertText: "" };
  }

  if (action.type === HANDLE_CHANGE) {
    return { ...state, [action.payload.name]: action.payload.value };
  }

  if (action.type === DEFAULT_TASK) {
    return {
      ...state,
      isEditing: false,
      editTaskID: "",
      description: "",
      task: "",
      taskArea: state.user.area || "",
      taskType: "Skole",
      status: "Ikke startet",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      area: action.payload.user.area,
      taskArea: action.payload.user.area,
      showingAlert: true,
      alertType: "success",
      alertText: action.payload.alertMessage,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return { ...state, showSidebar: !state.showSidebar };
  }

  if (action.type === LOGOUT_USER) {
    return {
      user: null,
      token: null,
      ...initialState,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      area: action.payload.area,
      taskArea: action.payload.area,
      showingAlert: true,
      alertType: "success",
      alertText: "Din profil er opdateret.. 🫡",
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "danger",
      alertText: action.payload.error,
    };
  }

  if (action.type === CREATE_TASK_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_TASK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "success",
      alertText: "Opgaven er oprettet!",
    };
  }

  if (action.type === CREATE_TASK_ERROR) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_TASKS_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_TASKS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      tasks: action.payload.tasks,
      numberOfTasks: action.payload.numberOfTasks,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === EDIT_TASK) {
    const stateTask = state.tasks.find(
      (task) => task._id === action.payload.id
    );

    const { _id: id, task, description, area, taskType, status } = stateTask;
    return {
      ...state,
      isEditing: true,
      editTaskID: id,
      task,
      description,
      taskArea: area,
      taskType: stateTask.type,
      status,
    };
  }

  if (action.type === DELETE_TASK_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_TASK_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_TASK_ERROR) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === EDIT_TASK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      isEditing: false,
      alertType: "success",
      alertText: "Opgaven er opdateret!",
    };
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyTasks: action.payload.monthlyTasks,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "alle",
      searchType: "alle",
      sort: "nyeste",
    };
  }

  if (action.type === SEND_EMAIL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === SEND_EMAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "success",
      alertText: "Email er sendt!",
    };
  }

  if (action.type === SEND_EMAIL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === SEND_IMPROVEMENT_BEGIN) {
    return { ...state };
  }

  if (action.type === SEND_IMPROVEMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
      isImprovements: false,
    };
  }

  if (action.type === SEND_IMPROVEMENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
      isImprovements: false,
    };
  }

  if (action.type === SHOW_IMPROVEMENTS) {
    return {
      ...state,
      isImprovements: true,
    };
  }

  if (action.type === HIDE_IMPROVEMENTS) {
    return {
      ...state,
      isImprovements: false,
    };
  }

  if (action.type === DELETE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "success",
      alertText: "Brugeren er slettet!",
    };
  }

  if (action.type === DELETE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showingAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  throw new Error(`Ingen tilsvarende action : ${action.type}`);
};

export default reducer;
