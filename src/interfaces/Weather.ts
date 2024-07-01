export interface HourlyWeather {
    time: string;
    temperature_2m: number;
    weathercode: number;
}

export interface Weather {
    temperature: number;
    weatherCode: number;
    time: string;
    windSpeed: number;
    isDay: boolean;
    windDirection: number;
}