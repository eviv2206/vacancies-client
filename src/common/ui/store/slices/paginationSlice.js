import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalFavouritePages: 0,
    totalVacancyPages: 0,
};

const paginationSlice= createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setTotalFavouritePages: (state, action) => {
            state.totalFavouritePages = action.payload;
        },
        setTotalVacancyPages: (state, action) => {
            state.totalVacancyPages = action.payload;
        }
    },
});

export const {
    setTotalFavouritePages,
    setTotalVacancyPages
} = paginationSlice.actions;

export default paginationSlice.reducer;
