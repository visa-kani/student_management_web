import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/login";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
