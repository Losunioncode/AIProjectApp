import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Customers {
  name: string;
  email: string;
  userId: string;
  createdAt: string;
  status: string;
}

const initialState: Customers[] = [];

const customerSlice = createSlice({
  name: "Customers",
  initialState,
  reducers: {
    addCustomer(state, action: PayloadAction<Customers>) {
      state.push(action.payload);
    },
  },
});

export const { addCustomer } = customerSlice.actions;
export const customerSelector = (state: RootState) => state.customersClient;
export default customerSlice.reducer;
