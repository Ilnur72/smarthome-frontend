import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import buildingReducer from "./slices/buildingSlice";
import staffReducer from "./slices/staffSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    building: buildingReducer,
    userData: staffReducer,
  },
});

export default store;
