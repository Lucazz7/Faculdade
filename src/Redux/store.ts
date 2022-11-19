import { configureStore } from "@reduxjs/toolkit";
import propsMaps from "./redux-DashBoard";
import duckUsers from "./redux-Users";
const store = configureStore({
  reducer: {
    dashboardMap: propsMaps,
    duckUsers,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
