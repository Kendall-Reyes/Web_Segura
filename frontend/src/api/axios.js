import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // o el puerto de tu backend
  withCredentials: true, // importante para cookies HttpOnly
});

export default instance;