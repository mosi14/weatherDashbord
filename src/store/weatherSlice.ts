import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Weather} from "../interfaces/Weather";
import {City} from "../interfaces/city";

interface WeatherState {
    selectedCity: City
    currentWeather: Weather | null;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    selectedCity: {name: 'Milan', display_name: 'Milan, Lombardy, Italy', lat: 45.4641943, lon: 9.1896346},
    currentWeather: null,
    loading: false,
    error: null
};


export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async ({latitude, longitude}: { latitude: number; longitude: number }) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&daily=temperature_2m_max,temperature_2m_min`;
        const response = await fetch(url);
        const data = await response.json();
        return {
            temperature: data.current_weather.temperature,
            weatherCode: data.current_weather.weathercode,
            time: data.current_weather.time,
            windSpeed: data.current_weather.windspeed,
            isDay: data.current_weather.is_day,
            windDirection: data.current_weather.winddirection
        };
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        changeSelectedCity(state, action) {
            state.selectedCity = action.payload
        }
    },
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
export const {changeSelectedCity} = weatherSlice.actions