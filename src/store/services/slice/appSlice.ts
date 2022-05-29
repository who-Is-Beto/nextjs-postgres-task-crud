import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IStore = {
  token: ""
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state: IStore, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }
});

export const { setToken } = appSlice.actions;
export default appSlice.reducer;
