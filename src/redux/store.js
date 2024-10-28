// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './countrySlice';
import searchCountryReducer from './searchCountrySlice';

export const store = configureStore({
    reducer: {
        countries: countryReducer,
        searchCountry: searchCountryReducer,
    },
});
