import {configureStore} from "@reduxjs/toolkit";
import vacancySearchReducer from "./slices/vacancySearchSlice";

export const setupStore = (preloadedState) => {
    return configureStore({
        reducer: {
            vacancySearch: vacancySearchReducer,
        },
        preloadedState
    });
};
