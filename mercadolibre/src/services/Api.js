import axios from "axios";

export const getSearch = async (q) => {
  try {
    const response = await axios(
      "http://localhost:3000/api/items", //http://localhost:3000/api/items
      {
        params: { q },
      }
    );
    return response;
  } catch (error) {
    console.log("error: ", error);
    return;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios(`http://localhost:3000/api/items/${id}`);
    return response;
  } catch (error) {
    console.log("error: ", error);
    return;
  }
};
