import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import dataReducer from "../redux/schoolSlice";
import authReducer from "../redux/authSlice";
import reviewReducer from "../redux/reviewSlice";
import schoolFilter from "../redux/schoolFilterSlice";
import commentReducer from "../redux/commentSlice";
import jobReducer from "../redux/careersSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  data: dataReducer,
  auth: authReducer,
  review: reviewReducer,
  schoolFilters: schoolFilter,
  blogComment: commentReducer,
  careersJob: jobReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
