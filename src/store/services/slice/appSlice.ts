import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStore, TIncomingTime } from "shimps";

const initialState: IStore = {
  config: {
    darkMode: true,
    incomingTime: "all"
  }
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIncomingTime: (state, action: PayloadAction<TIncomingTime>) => {
      state.config.incomingTime = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.config.darkMode = action.payload;
    }
  }
});

export const { setDarkMode, setIncomingTime } = appSlice.actions;

export default appSlice.reducer;
