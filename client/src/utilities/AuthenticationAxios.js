import axios from "axios";

const AuthenticationAxios = (token) => {
  return axios.create({
    baseURL: "/api",
  });
};


export default AuthenticationAxios;