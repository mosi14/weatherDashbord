import {configureStore} from '@reduxjs/toolkit';
import WeatherReducer from './weatherSlice'
import citySearchReducer from "./citySearchSlice";


const store = configureStore({
    reducer: {
        weather: WeatherReducer,
        citySearch: citySearchReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store