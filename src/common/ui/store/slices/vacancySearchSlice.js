import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFiltered: false,
    vacancies: null,
    selectedIndustry: {
        title: '',
        key: 0,
    },
    salaryFrom: '',
    salaryTo: '',
    keyword: '',
};

const  vacancySearchSlice= createSlice({
    name: 'vacancySearch',
    initialState,
    reducers: {
        setIsFiltered: (state) => {
          state.isFiltered = true;
        },
        resetIsFiltered: (state) => {
          state.isFiltered = false;
        },
        setVacancies: (state, action) => {
            state.vacancies = action.payload;
        },
        resetVacancies: (state) => {
            state.vacancies = null;
        },
        setSelectedIndustry: (state, action) => {
            state.selectedIndustry = action.payload;
        },
        resetSelectedIndustry: (state) => {
            state.selectedIndustry = {
                title: '',
                key: 0,
            };
        },
        setSalaryFrom: (state, action) => {
            state.salaryFrom = action.payload;
        },
        resetSalaryFrom: (state) => {
            state.salaryFrom = '';
        },
        setSalaryTo: (state, action) => {
            state.salaryTo = action.payload;
        },
        resetSalaryTo: (state) => {
            state.salaryTo = '';
        },
        setKeyword: (state, action) => {
            state.keyword = action.payload;
        },
        resetKeyword: (state) => {
            state.keyword = '';
        }
    },
});

export const {
    setIsFiltered,
    resetIsFiltered,
    setVacancies,
    resetVacancies,
    setSelectedIndustry,
    resetSelectedIndustry,
    setSalaryFrom,
    resetSalaryFrom,
    setSalaryTo,
    resetSalaryTo,
    setKeyword,
    resetKeyword,
} = vacancySearchSlice.actions;

export default vacancySearchSlice.reducer;
