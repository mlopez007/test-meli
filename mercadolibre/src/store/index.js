import { createStore } from "redux";

const productReducer = (state = { products: [], search: "" }, action) => {
  switch (action.type) {
    case "CHANGE_SEARCH":
      return {
        search: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(productReducer);

export default store;
