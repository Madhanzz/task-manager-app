import axios from "axios";

const API = axios.create({
  baseURL:  "https://task-manager-app-drwg.onrender.com/api/auth",
});

export default API;