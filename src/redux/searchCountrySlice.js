// src/redux/searchCountrySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_COUNTRY_URL = 'https://restcountries.com/v3.1/name';
const BASE_WEATHER_URL = 'http://api.weatherapi.com/v1/current.json';
const WEATHER_API_KEY = '265845166ed2470590c53944242710';

// Thunk to fetch country details with weather for search functionality
export const searchCountryDetails = createAsyncThunk(
    'searchCountry/searchCountryDetails',
    async (countryName, thunkAPI) => {
        try {
            const { data: [countryData] } = await axios.get(`${BASE_COUNTRY_URL}/${countryName}`);
            const { data: weatherData } = await axios.get(`${BASE_WEATHER_URL}?key=${WEATHER_API_KEY}&q=${countryData.name.common}`);
            return { country: countryData, weather: weatherData };
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch country details');
        }
    }
);

const searchCountrySlice = createSlice({
    name: 'searchCountry',
    initialState: {
        searchedCountry: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSearchedCountry: (state) => {
            state.searchedCountry = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchCountryDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchCountryDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.searchedCountry = action.payload;
            })
            .addCase(searchCountryDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSearchedCountry } = searchCountrySlice.actions;
export default searchCountrySlice.reducer;
