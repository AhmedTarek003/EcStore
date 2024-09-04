import axios from "axios";
axios.defaults.withCredentials = true;

export const request = axios.create({
  baseURL: "https://ec-store-sand.vercel.app",
});
