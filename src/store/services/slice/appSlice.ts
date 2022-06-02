import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStore } from "shimps";

const initialState: IStore = {
  darkMode: false
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {}
});

export default appSlice.reducer;
