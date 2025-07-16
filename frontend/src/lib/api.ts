import { Animal, LoginRequest, RegisterRequest } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
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

  async register({ name, email, password }: RegisterRequest) {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  }

  async getAnimals() {
    const response = await api.get<Animal[]>("/animal");
    return response.data;
  }

  async getPlants() {
    const response = await api.get("/plantas");
    return response.data.plantas;
  }

  async getThreat() {
    const response = await api.get("/threat");
    return response.data.threats;
  }
}

const authAPI = new AuthAPI();
export default authAPI;
