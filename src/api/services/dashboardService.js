import httpClient from "../httpClient";

export const getDashboardData = async () => {
  try {
    const { data } = await httpClient.get("/dashboard");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
