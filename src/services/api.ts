// import axios, { AxiosInstance } from "axios";

// let api: AxiosInstance;

// if (process.env.NODE_ENV !== 'production') {
//   api = axios.create({ baseURL: "http://localhost:3001" });
// } else {
//   api = axios.create({ baseURL: "https://redsterna-dev.herokuapp.com" });
// }

// api.interceptors.request.use((config: any) => {
//   try {
//     let token = localStorage.getItem("token");

//     if (token) {
//       config.headers.token = `Bearer ${token}`;
//     }
//   } catch (err) {
//     console.error(err);
//   } finally {
//     return config;
//   }
// });

// export default api;

import axios from 'axios';
function setupAPIClient () {
  if (process.env.NODE_ENV !== 'production') {
    return axios.create({
      baseURL: "http://localhost:3001",
    });
  } else {
    return axios.create({
      baseURL: "https://redsterna-dev.herokuapp.com",
    });
  }

}

export const api = setupAPIClient();