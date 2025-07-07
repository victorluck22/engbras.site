import httpClient from "../httpClient";

export const sendPageView = async (data) => {
  try {
    //console.log("Sending page view data:", data);
    await httpClient.post("/pagelog", data);
  } catch (error) {
    console.error("Log error", error);
  }
};
