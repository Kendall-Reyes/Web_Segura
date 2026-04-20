import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // o el puerto de tu backend
  withCredentials: true, // importante para cookies HttpOnly
});

instance.interceptors.response.use(
  (response) => {
    // Si la respuesta tiene .data.data, extráelo automáticamente
    // Si no (como el login), devuelve response.data normal
    if (response.data?.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => Promise.reject(error)
);

export default instance;