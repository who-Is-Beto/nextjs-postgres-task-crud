import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStore, TIncomingTime, TLenguages } from "shimps";

const initialState: IStore = {
  config: {
    lenguage: "english",
    darkMode: true,
    incomingTime: "next 3 days"
  }
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIncomingTime: (state, action: PayloadAction<TIncomingTime>) => {
      state.config.incomingTime = action.payload;
    },
    setLenguage: (state, action: PayloadAction<TLenguages>) => {
      state.config.lenguage = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.config.darkMode = action.payload;
    },
    setConfig: (state, action: PayloadAction<IStore["config"]>) => {
      state.config = action.payload;
    }
  }
});

export const { setDarkMode, setLenguage, setIncomingTime, setConfig } =
  appSlice.actions;

export default appSlice.reducer;
