"use client";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
type RedaxProviderProps = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: RedaxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
