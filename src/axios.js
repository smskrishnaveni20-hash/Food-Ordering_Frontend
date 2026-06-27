// import axios from "axios";

// const isDevelopment = import.meta.env.MODE === "development";

// const BASE_URL = isDevelopment? 
// import.meta.env.VITE_API_BASE_URL_LOCAL: import.meta.env.VITE_API_BASE_URL_DEPLOY;


// const API = axios.create({
//   baseURL: "BASE_URL",
// });

// API.interceptors.request.use(config => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;

import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";

const BASE_URL = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY;

const API = axios.create({
  baseURL: BASE_URL,  
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("access");  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
