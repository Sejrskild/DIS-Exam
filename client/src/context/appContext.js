import axios from "axios";
import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import AuthenticationAxios from "../utilities/AuthenticationAxios";

import {
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_ALERT,
  DISPLAY_ALERT,
  HANDLE_CHANGE,
  DEFAULT_TASK,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CREATE_TASK_BEGIN,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
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

// Initial values from localStorage looaded into my initial states (if they exist)

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  area: "",
  // Global,
  isLoading: false,
  showingAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  // Tasks
  isEditing: false,
  editTaskID: "",
  description: "",
  task: "",
  taskTypes: [
    "Skole",
    "Rengøring",
    "Indkøb",
    "Socialt",
    "Motion",
    "Gaver",
    "Fødselsdag",
    "Fest",
    "Privat",
  ],
  taskArea: "",
  taskType: "Skole",
  statusOptions: ["Ikke startet", "Igangværende", "Udført"],
  status: "Ikke startet",
  tasks: [],
  numberOfTasks: 0,
  page: 1,
  numOfPages: 1,
  stats: {},
  monthlyTasks: [],
  search: "",
  searchStatus: "alle",
  searchType: "alle",
  sort: "nyeste",
  sortOptions: ["nyeste", "ældste"],
  isImprovements: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Utils for instance Axios request using Bearer Token - RFC 6750
  const AuthenticationFetch = AuthenticationAxios(state.token);
  AuthenticationFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  AuthenticationFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  const showImprovements = () => {
    dispatch({ type: SHOW_IMPROVEMENTS });
  };

  const hideImprovements = () => {
    dispatch({ type: HIDE_IMPROVEMENTS });
  };

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    removeAlert();
  };

  const removeAlert = (timer) => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, timer || 3000);
  };

  const addLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: DEFAULT_TASK });
  };

  const setupUser = async ({ userLogin, route, alertMessage }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      const response = await axios.post(`/api/auth/${route}`, userLogin);
      const { user, token } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertMessage },
      });
      addLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      removeLocalStorage();
    }
    removeAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logout = async () => {
    dispatch({ type: LOGOUT_USER });
    await axios("/api/auth/logout");
    removeLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await AuthenticationFetch.patch(
        "auth/updateUser",
        currentUser
      );

      const { user, token, area } = data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token, area } });
      addLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { error: error.response.data.msg },
        });
      }
    }
    removeAlert();
  };

  const createTask = async () => {
    dispatch({ type: CREATE_TASK_BEGIN });
    try {
      const { task, description, taskArea, taskType, status } = state;
      await AuthenticationFetch.post("/tasks", {
        task,
        description,
        taskArea,
        type: taskType,
        status,
      });
      dispatch({ type: CREATE_TASK_SUCCESS });
      clearValues();
    } catch (error) {
      const { status } = error.response;
      if (status === 401) return;
      dispatch({
        type: CREATE_TASK_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    removeAlert();
  };

  const getTasks = async () => {
    const { sort, searchType, searchStatus, search } = state;
    let tempUrl = `/tasks?status=${searchStatus}&taskType=${searchType}&sort=${sort}`;

    if (search) {
      tempUrl += `&search=${search}`;
    }

    dispatch({ type: GET_TASKS_BEGIN });
    try {
      const { data } = await AuthenticationFetch.get(tempUrl);
      const { tasks, numberOfTasks, numOfPages } = data;
      dispatch({
        type: GET_TASKS_SUCCESS,
        payload: { tasks, numberOfTasks, numOfPages },
      });
    } catch (error) {
      console.error(error.response);
      logout();
    }
    removeAlert();
  };

  const setEditTask = (id) => {
    dispatch({ type: EDIT_TASK, payload: { id } });
  };

  const editTask = async () => {
    dispatch({ type: EDIT_TASK_BEGIN });
    try {
      const { task, description, taskArea, taskType, status } = state;
      await AuthenticationFetch.patch(`/tasks/${state.editTaskID}`, {
        task,
        description,
        area: taskArea,
        type: taskType,
        status,
      });
      dispatch({ type: EDIT_TASK_SUCCESS });
      clearValues();
    } catch (error) {
      dispatch({
        type: EDIT_TASK_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    removeAlert();
  };
  const deleteTask = async (id) => {
    dispatch({ type: DELETE_TASK_BEGIN });
    try {
      await AuthenticationFetch.delete(`tasks/${id}`);
      getTasks();
    } catch (error) {
      console.error(error.response);
      logout();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await AuthenticationFetch("/tasks/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.userStats,
          monthlyTasks: data.monthlyTasks,
        },
      });
    } catch (error) {}
    removeAlert();
  };

  const clearSearchQueries = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const sendMail = async () => {
    const { email } = state.user;

    dispatch({ type: SEND_EMAIL_BEGIN });
    try {
      const { data } = await AuthenticationFetch.post("/tasks/mail", { email });
      dispatch({ type: SEND_EMAIL_SUCCESS, payload: { msg: data.msg } });
    } catch (error) {
      dispatch({
        type: SEND_EMAIL_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    removeAlert();
  };

  const sendImprovementMail = async (improvement) => {
    const { email } = state.user;

    dispatch({ type: SEND_IMPROVEMENT_BEGIN });
    try {
      const { data } = await AuthenticationFetch.post("/tasks/improvement", {
        improvement,
        email,
      });
      dispatch({ type: SEND_IMPROVEMENT_SUCCESS, payload: { msg: data.msg } });
    } catch (error) {
      dispatch({
        type: SEND_IMPROVEMENT_ERROR,
        payload: { msg: error.response.data },
      });
    }
    removeAlert(10000);
  };

  const deleteUser = async () => {
    dispatch({ type: DELETE_USER_BEGIN });
    try {
      await AuthenticationFetch.delete("/auth/deleteUser");
      dispatch({ type: DELETE_USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: DELETE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    logout();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        handleChange,
        clearValues,
        setupUser,
        toggleSidebar,
        logout,
        updateUser,
        createTask,
        getTasks,
        setEditTask,
        editTask,
        deleteTask,
        showStats,
        clearSearchQueries,
        sendMail,
        sendImprovementMail,
        showImprovements,
        hideImprovements,
        deleteUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook der gør det muligt at bruge useContext nemmere.
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
