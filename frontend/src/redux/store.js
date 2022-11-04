import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import tourReducer from "./features/tourSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
  },
});
