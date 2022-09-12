import { configureStore } from "@reduxjs/toolkit";
import { rootServices } from "./services/rootService";
import appSlice from "./services/slice/appSlice";

export const store = configureStore({
  reducer: {
    [rootServices.reducerPath]: rootServices.reducer,
    app: appSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootServices.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
