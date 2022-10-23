import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStore, TLenguages } from "shimps";

const initialState: IStore = {
  config: {
    lenguage: "english",
    darkMode: true
  },
  auth: {
    token: false
  }
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLenguage: (state, action: PayloadAction<TLenguages>) => {
      state.config.lenguage = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.config.darkMode = action.payload;
    }
  }
});

export const { setDarkMode, setLenguage } = appSlice.actions;

export default appSlice.reducer;
