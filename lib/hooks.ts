import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook, UseDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
