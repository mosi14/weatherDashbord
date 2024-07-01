import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
interface City {
    name: string;
    display_name: string;
    lat: number;
    lon: number;
}
interface SearchCity {
    cities: City[],
    loading: boolean,
    error: string | null,
}

const initialState: SearchCity = {
    cities: [],
    loading: false,
    error: null
}

export const fetchCities = createAsyncThunk(
    'citySearch/fetchCities',
    async (cityName: string, {rejectWithValue}) => {
        console.log(cityName)
        try {
            const url=`https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
            const response = await fetch(url)
            const data = await response.json();
            return data
        } catch (error) {
            return rejectWithValue('Failed to fetch cities');
        }
    }
);


const citySearchSlice = createSlice({
    name: 'citySearch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchCities.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCities.fulfilled, (state, action) => {
            state.cities = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCities.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to load cities';
            state.loading = false;
            state.cities = [];
        })
    },
});

export default citySearchSlice.reducer;