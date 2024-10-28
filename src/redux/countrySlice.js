// src/redux/countrySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_COUNTRY_URL = 'https://restcountries.com/v3.1/name';
const BASE_WEATHER_URL = 'http://api.weatherapi.com/v1/current.json';
const WEATHER_API_KEY = '265845166ed2470590c53944242710';

// Thunk to fetch country details with weather
export const fetchCountryDetails = createAsyncThunk(
    'countries/fetchCountryDetails',
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

const countrySlice = createSlice({
    name: 'countries',
    initialState: {
        countries: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountryDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountryDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.countries.push(action.payload);
            })
            .addCase(fetchCountryDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default countrySlice.reducer;
