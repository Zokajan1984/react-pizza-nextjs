import axios from "axios";

export const api = axios.create({
  baseURL: "https://faux-api.com",
  headers: { "Content-Type": "application/json" },
});
