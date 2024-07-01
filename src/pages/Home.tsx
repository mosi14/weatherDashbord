import {useState, useCallback, useEffect} from "react";
import {Grid} from "@mui/material";
import SideBar from "../components/SideBar";
import MainContent from "../components/MainContent";
import {City} from "../interfaces/city";
import {debounce} from "lodash";
import {fetchCities} from "../store/citySearchSlice";
import {fetchWeatherData} from "../store/weatherSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";

export default function HomePage() {
    const dispatch = useAppDispatch()

    const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
    const [inputValue, setInputValue] = useState('');
    const {cities} = useAppSelector(state => state.citySearch);

    const debouncedFetchCities = useCallback(
        debounce((searchQuery) => {
            dispatch(fetchCities(searchQuery));
            console.log(cities)
        }, 500),
        [dispatch]
    );

    useEffect(() => {
        if (inputValue.length > 2) {
            debouncedFetchCities(inputValue);
        }
    }, [debouncedFetchCities, selectedCity, inputValue]);

    useEffect(() => {
        if (selectedCity) {
            dispatch(fetchWeatherData({latitude: selectedCity.lat, longitude: selectedCity.lon}))
        }
        //console.log(hourlyWeather)
    }, [selectedCity, dispatch]);

    const handleSelectedCity = (city: City) => {
        setSelectedCity(city);
    };
    const handleInputValue = (value: string) => {
        setInputValue(value)
    }

    return (
        <Grid container style={{minHeight: '100vh'}}>
            <Grid item xs={12} md={4}>
                <SideBar onSelectedCity={handleSelectedCity} onInputValue={handleInputValue}/>
            </Grid>
            <Grid item xs={12} md={8}>
                <MainContent selectedCity={selectedCity}/>
            </Grid>
        </Grid>
    )
}