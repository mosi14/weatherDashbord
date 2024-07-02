import React from "react";
import {Box, Card, CardContent, Grid, Paper, Typography} from "@mui/material";
import dayjs from "dayjs";
import {useAppSelector} from "../app/hooks";
import weatherCodes from "../interfaces/weatherCodes";
import {City} from "../interfaces/city";

interface MainContentProps {
    selectedCity: City | undefined
}

export default function ({selectedCity}: MainContentProps) {
    const weather = useAppSelector(state => state.weather);
    const {currentWeather, loading, error} = weather;

    if (loading) return <Grid item xs={12} md={8}><Typography variant='body1'>Loading...</Typography> </Grid>;
    if (error) return <Grid item xs={12} md={8}><Typography variant='body1'>Error: {error}</Typography></Grid>;

    return (
        <Paper sx={{height: '100%', p: 2, bgcolor: '#82A8C9FF'}}>
            {currentWeather && (
                <Box mb={4}>
                    <Typography variant="h4" gutterBottom>
                        Current Weather in {selectedCity?.name}
                    </Typography>
                    <Card sx={{textAlign: 'center'}}>
                        <CardContent>
                            <img
                                src={`${weatherCodes[currentWeather.weatherCode]?.icon || 'default.png'}`}
                                alt={weatherCodes[currentWeather.weatherCode]?.description || 'Weather icon'}
                                style={{width: 200, height: 200}}
                            />
                            <Typography variant="h5">
                                {Math.round(currentWeather.temperature)}°C
                            </Typography>
                            <Typography variant="h6">
                                {weatherCodes[currentWeather.weatherCode]?.description || 'Unknown'}
                            </Typography>
                            <Typography variant="subtitle2">
                                {dayjs(currentWeather?.time).format('DD MMMM YYYY HH:mm A')}
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
        </Paper>
    )
}