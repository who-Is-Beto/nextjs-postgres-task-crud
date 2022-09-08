import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth, IStore, TLenguages } from "shimps";

const initialState: IStore = {
  config: {
    lenguage: {
      english: true,
      spanish: false,
      french: false
    },
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
      Object.keys(state.config.lenguage).forEach((key) => {
        state.config.lenguage[key] = false;
      });
      state.config.lenguage[action.payload] = true;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.config.darkMode = action.payload;
    },
    setAuth: (state, action: PayloadAction<IAuth>) => {
      state.auth = action.payload;
    }
  }
});

export const { setDarkMode, setLenguage, setAuth } = appSlice.actions;

export default appSlice.reducer;
