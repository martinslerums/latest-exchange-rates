import axios from "axios";

export const customApi = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
