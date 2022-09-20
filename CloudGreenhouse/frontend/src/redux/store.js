import { configureStore } from "@reduxjs/toolkit";

import detailReducer from "./detailSlice";
import commandReducer from "./commandSlice";

const store = configureStore({
  reducer: {
    detail: detailReducer,
    command: commandReducer,
  },
});

export default store;
