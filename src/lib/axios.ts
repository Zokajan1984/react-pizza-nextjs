import axios from "axios";

export const api = axios.create({
  // Запросы теперь идут на собственный встроенный бэкенд Next.js
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
