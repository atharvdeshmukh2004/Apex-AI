import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

export const sendChat = (message, history) =>
  api.post("/chat", { message, history }).then((r) => r.data);

export default api;
