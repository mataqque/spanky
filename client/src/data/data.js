import { configureStore } from '@reduxjs/toolkit';
import routesFeatures from './routeStore';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import navbarSlice from '../components/page/navbar/navbarSlice';
import { authApi } from './oauthSlice'
import dashboardSlice from '../pages/dashboard/dashboardSlice';
import FileManagerSlice from '../components/dashboard/FileManager/FileManagerSlice';
import userStore from './userStore';
import modalStore from '../components/UI/modal/modalSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { getpage } from './getData';

const middleware = [
    authApi.middleware,
    getpage.middleware
]

export const store = configureStore({
    reducer: {
        routesFeatures:routesFeatures,
        navbarSlice:navbarSlice,
        dashboardSlice:dashboardSlice,
        fileManagerSlice:FileManagerSlice,
        usersSlice: userStore,
        modal:modalStore,
        [authApi.reducerPath]: authApi.reducer,
        [getpage.reducerPath]: getpage.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

// setupListeners(store.dispatch)