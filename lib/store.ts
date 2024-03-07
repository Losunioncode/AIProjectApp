import { configureStore } from "@reduxjs/toolkit";
import customersClient from "./features/customersClient";
export const store = configureStore({
  reducer: {
    customersClient,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
