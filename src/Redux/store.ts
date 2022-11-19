import { configureStore } from '@reduxjs/toolkit';
import propsMaps from './redux-DashBoard';
import duckUsers from './redux-Users';
import propsAuthentication from './redux-authentication';
const store = configureStore({
    reducer: {
        dashboardMap: propsMaps,
        duckUsers,
        propsAuthentication,

    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
