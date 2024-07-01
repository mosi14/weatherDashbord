import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {City} from "../interfaces/city";
import {fetchWeatherData} from "../store/weatherSlice";
import {useAppDispatch} from "../app/hooks";
import weatherCodes from "../interfaces/weatherCodes";
import {Weather} from "../interfaces/Weather";
import dayjs from "dayjs";

interface EnhancedCity extends City {
    weather?: Weather
}

const defaultCity: City[] = [
    {name: 'London', display_name: 'London, Greater London, England, United Kingdom', lat: 51.5074, lon: -0.1278},
    {name: 'New York', display_name: ' New York, United States', lat: 40.7128, lon: -74.0060},
    {name: 'Tokyo', display_name: ' Tokyo, Japan', lat: 35.6895, lon: 139.6917}
];

export default function CityCard() {
    const [cities, setCities] = useState<EnhancedCity[]>(defaultCity);
    const dispatch = useAppDispatch()

    useEffect(() => {
        cities.forEach((city, index) => {
            dispatch(fetchWeatherData({latitude: city.lat, longitude: city.lon}))
                .then(res => {
                    if (res.payload) {
                        setCities(prevCities => {
                            const updatedCities = [...prevCities];
                            const weatherData = res.payload as Weather;
                            updatedCities[index] = {
                                ...city,
                                weather: {
                                    temperature: weatherData.temperature,
                                    weatherCode: weatherData.weatherCode,
                                    time: weatherData.time,
                                    windSpeed: weatherData.windSpeed,
                                    isDay: weatherData.isDay,
                                    windDirection: weatherData.windDirection
                                }
                            };
                            return updatedCities;
                        });
                    }
                });
        });
    }, [dispatch]);
        console.log(cities)
    return (
        <>
            {cities.map((city, index) => (
                <Card key={index} sx={{display: 'flex', my: 2, alignItems: 'stretch'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" variant="h5">
                                {city.name}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                {dayjs(city.weather?.time).format('HH:mm A')}
                            </Typography>
                        </CardContent>
                        <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                            {city.weather && weatherCodes[city.weather.weatherCode]?.description || 'Unknown'}
                        </Box>
                    </Box>
                    <Box sx={{alignContent:'center', width: '100%', pr:3 }}>
                        <Typography  component="div" variant="h5" textAlign='end'>
                            {city.weather && Math.round(city.weather.temperature)}°C
                        </Typography>
                    </Box>

                </Card>
            ))}
        </>
    )
}
