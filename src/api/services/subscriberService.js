import httpClient from "../httpClient";
import {
  getFromLocal,
  removeFromLocal,
  saveToLocal,
} from "../../lib/locaStorageHelper";

const useMock = import.meta.env.VITE_USE_MOCK === "true";

const LOCAL_STORAGE_KEY = "subscribers";

export const subscribe = async (email) => {
  if (useMock) {
    let subscribers = getFromLocal(LOCAL_STORAGE_KEY) ?? [];
    const subscriber = {
      id: Date.now().toString(),
      email,
      created_at: Date.now(),
      updated_at: Date.now(),
    };
    subscribers.push(subscriber);
    saveToLocal(LOCAL_STORAGE_KEY, subscribers);
    return Promise.resolve({
      success: true,
      message: "Email inscrito com sucesso.",
      subscriber,
    });
  }
  try {
    const { data } = await httpClient.post("/subscribe", { email: email });
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getAllSubscribers = async () => {
  if (useMock) {
    const subscribers = getFromLocal(LOCAL_STORAGE_KEY) ?? [];
    return Promise.resolve({
      message: "Lista de incritos carregada.",
      success: true,
      subscribers,
    });
  }
  try {
    const { data } = await httpClient.get("/subscribers");
    //console.log(data.subscribers);
    return data;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    throw error;
  }
};

export const deleteSubscriber = async (email) => {
  if (useMock) {
    let subscribers = getFromLocal(LOCAL_STORAGE_KEY);
    subscribers = subscribers.filter((s) => s.email !== email);
    saveToLocal(LOCAL_STORAGE_KEY, subscribers);
    return Promise.resolve(true);
  }
  try {
    const response = await httpClient.delete(`/subscribe/${email}`);
    return true;
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    throw error;
  }
};
