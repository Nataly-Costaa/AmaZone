import { LoginRequest } from "@/types";
import axios from "axios";

const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
});

class AuthAPI {
  async login({ email, password }: LoginRequest) {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  }

  async me() {
    const response = await api.get("/auth/me");
    return response.data;
  }

  logout = () => {
    api.post("/auth/logout");
  };
}

const authAPI = new AuthAPI();
export default authAPI;