import axios from "axios";
axios.defaults.withCredentials = true;

export const request = axios.create({
  baseURL: "http://localhost:5000",
});
