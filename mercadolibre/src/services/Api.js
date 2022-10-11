import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getSearch = async (q) => {
  try {
    const response = await api.get("/api/items", {
      params: { q },
    });
    return response;
  } catch (error) {
    console.log("error: ", error);
    return;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/api/items/${id}`);
    return response;
  } catch (error) {
    console.log("error: ", error);
    return;
  }
};
