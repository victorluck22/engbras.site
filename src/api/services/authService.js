// src\api\services\authService.js
import httpClient from "../httpClient";
import { saveToLocal, removeFromLocal } from "../../lib/locaStorageHelper";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

const mockUser = {
  email: "adm",
  password: "adm",
  name: "Usuário Teste",
};

export const loginRequest = async (credentials) => {
  try {
    if (useMock) {
      const { email, password } = credentials;
      if (email === mockUser.email && password === mockUser.password) {
        saveToLocal("authUser", JSON.stringify(mockUser));
        return Promise.resolve({
          message: "mock Login Successfull",
          success: true,
          access_token: "mockUser",
          user: mockUser,
        });
      } else {
        return Promise.reject({
          message: "E-mail ou senha inválidos.",
          success: false,
        });
      }
    } else {
      const { data } = await httpClient.post("/auth/login", credentials);
      return data;
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutRequest = async () => {
  try {
    if (useMock) {
      removeFromLocal("authUser");
      return Promise.resolve({ message: "Logout Successfull", success: true });
    } else {
      const { data } = await httpClient.post("/auth/logout");
      return data;
    }
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
