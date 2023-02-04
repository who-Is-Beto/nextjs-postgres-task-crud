import {
  combineReducers,
  configureStore,
  PreloadedState
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { rootServices } from "./services/rootService";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./services/slice/appSlice";

const persistConfig = {
  key: "root",
  version: 1,
  whitelist: ["user"],
  storage
};

export const reducers = combineReducers({
  app: appSlice,
  [rootServices.reducerPath]: rootServices.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(rootServices.middleware)
});
export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: reducers,
    preloadedState
  });
setupListeners(store.dispatch);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof reducers>;
export type AppStore = ReturnType<typeof setupStore>;
export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
