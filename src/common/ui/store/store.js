import {configureStore} from "@reduxjs/toolkit";
import vacancySearchReducer from "./slices/vacancySearchSlice";
import paginationReducer from "./slices/paginationSlice";

export const setupStore = (preloadedState) => {
    return configureStore({
        reducer: {
            vacancySearch: vacancySearchReducer,
            pagination: paginationReducer,
        },
        preloadedState
    });
};
