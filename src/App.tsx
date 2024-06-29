import React, {useState, useEffect} from 'react';
import './App.css';
import {Container, Typography, Select, MenuItem, Card, CardContent, Grid, Box} from '@mui/material';
import weatherCodes from './interfaces/weatherCodes';
import {fetchWeatherData} from "./store/weatherSlice";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import dayjs from "dayjs";
import NavbarMenu from "./components/NavbarMenu";

interface City {
    name: string;
    lat: number;
    lon: number;
}

const cities: City[] = [
    {name: 'London', lat: 51.5074, lon: -0.1278},
    {name: 'New York', lat: 40.7128, lon: -74.0060},
    {name: 'Tokyo', lat: 35.6895, lon: 139.6917}
];

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const weather = useAppSelector(state => state.weather);
    const {currentWeather, loading, error} = weather;
    const [selectedCity, setSelectedCity] = useState<City>(cities[0]);

    useEffect(() => {
        dispatch(fetchWeatherData({latitude: selectedCity.lat, longitude: selectedCity.lon}))
        //console.log(hourlyWeather)

    }, [selectedCity, dispatch]);

    if (loading) return <Box><Typography variant='body1'>Loading...</Typography> </Box>;
    if (error) return <Box><Typography variant='body1'>Error: {error}</Typography></Box>;

    return (
        <>
            <NavbarMenu/>
            <Box>
                <Box>
                    <Select
                        value={selectedCity.name}
                        onChange={(e) => setSelectedCity(cities.find(city => city.name === e.target.value)!)}
                        displayEmpty
                    >
                        {cities.map((city) => (
                            <MenuItem key={city.name} value={city.name}>
                                {city.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                {currentWeather && (
                    <Box mb={4}>
                        <Typography variant="h4" gutterBottom>
                            Current Weather in {selectedCity.name}
                        </Typography>
                        <Card sx={{textAlign: 'center'}}>
                            <CardContent>
                                <img
                                    src={`${weatherCodes[currentWeather.weatherCode]?.icon || 'default.png'}`}
                                    alt={weatherCodes[currentWeather.weatherCode]?.description || 'Weather icon'}
                                    style={{width: 200, height: 200}}
                                />
                                <Typography variant="h5">
                                    {currentWeather.temperature}°C
                                </Typography>
                                <Typography variant="h6">
                                    {weatherCodes[currentWeather.weatherCode]?.description || 'Unknown'}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {dayjs(new Date()).format('DD MMMM YYYY HH:mm A')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                )}
                {/*           {Object.keys(hourlyWeather).length > 0 && (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Hourly Forecast
                    </Typography>
                    {Object.keys(hourlyWeather).map((date) => (
                        <Box key={date} mb={4}>
                            <Typography variant="h5" gutterBottom>
                                {new Date(date).toLocaleDateString()}
                            </Typography>
                            <Grid container spacing={2}>
                                {hourlyWeather[date].map((hour, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="body1">
                                                    Time: {new Date(hour.time).toLocaleTimeString()}
                                                </Typography>
                                                <Typography variant="body1">
                                                    Temperature: {hour.temperature}°C
                                                </Typography>
                                                <Typography variant="body1">
                                                    Weather: {weatherCodes[hour.weathercode]?.description || 'Unknown'}
                                                </Typography>
                                                <img
                                                    src={`${weatherCodes[hour.weathercode]?.icon || 'default.png'}`}
                                                    alt={weatherCodes[hour.weathercode]?.description || 'Weather icon'}
                                                    style={{width: 50, height: 50}}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))}
                </Box>
            )}*/}
            </Box>
        </>
    );
};

export default App;