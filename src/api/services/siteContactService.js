import httpClient from "../httpClient";
import { saveToLocal, getFromLocal } from "../../lib/locaStorageHelper";

const useMock = import.meta.env.VITE_USE_MOCK === "true";
const LOCAL_STORAGE_KEY = "siteContacts";

export const getAllContacts = async () => {
  if (useMock) {
    const contacts = getFromLocal(LOCAL_STORAGE_KEY) ?? [];
    return Promise.resolve({
      siteContacts: contacts,
      success: true,
      message: "Lista carregada",
    });
  }
  try {
    const { data } = await httpClient.get("site-contact");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createContact = async (contactData) => {
  if (useMock) {
    let contacts = getFromLocal(LOCAL_STORAGE_KEY) ?? [];
    const contact = {
      id: Date.now().toString(),
      created_at: Date.now(),
      updated_at: Date.now(),
      ...contactData,
    };
    contacts.push(contact);
    saveToLocal(LOCAL_STORAGE_KEY, contacts);
    return Promise.resolve({
      success: true,
      message: "Contato registrado com sucesso!",
      siteContact: contact,
    });
  }
  try {
    const { siteContacts } = await httpClient.post(
      "/site-contact",
      contactData
    );
    return siteContacts;
  } catch (error) {
    console.error("Error creating site contact: ", error);
    return error;
  }
};
