import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface WeatherState {
    currentWeather: {
        temperature: number;
        weatherCode: number;
        icon: string;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    currentWeather: null,
    loading: false,
    error: null
};

export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async ({ latitude, longitude }: { latitude: number; longitude: number }) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const response = await fetch(url);
        const data = await response.json();
        return {
            temperature: data.current_weather.temperature,
            weatherCode: data.current_weather.weathercode, // Map this to actual descriptions
            icon: '' // Determine how to derive icon from weather code or another source
        };
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.currentWeather = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchWeatherData.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Failed to fetch weather data';
        });
    }
});

export default weatherSlice.reducer;