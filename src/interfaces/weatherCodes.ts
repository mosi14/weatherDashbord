interface WeatherCodes {
    description: string;
    icon: string;
}

const weatherCodes: { [key: number]: WeatherCodes } = {
    0: { description: 'Clear sky', icon: require(`../assets/clear_sky.png`)},
    1: { description: 'Mainly clear', icon: require('../assets/clear_sky.png') },
    2: { description: 'Partly cloudy', icon: require('../assets/partly_cloudy.png' )},
    3: { description: 'Overcast', icon: require('../assets/overcast.png' )},
    45: { description: 'Fog', icon: require('../assets/fog.png') },
    48: { description: 'Depositing rime fog', icon:require( '../assets/fog.png') },
    51: { description: 'Drizzle: Light', icon: require('../assets/drizzle_light.png' )},
    53: { description: 'Drizzle: Moderate', icon: require('../assets/drizzle_moderate.png') },
    55: { description: 'Drizzle: Dense', icon: require('../assets/drizzle_dense.png' )},
    61: { description: 'Rain: Slight', icon: require('../assets/rain_slight.png' )},
    63: { description: 'Rain: Moderate', icon: require('../assets/rain_moderate.png' )},
    65: { description: 'Rain: Heavy', icon: require('../assets/rain_heavy.png' )},
    71: { description: 'Snow fall: Slight', icon:require( '../assets/snow_slight.png' )},
    73: { description: 'Snow fall: Moderate', icon:require( '../assets/snow_moderate.png' )},
    75: { description: 'Snow fall: Heavy', icon:require( '../assets/snow_heavy.png') },
    80: { description: 'Rain showers: Slight', icon:require( '../assets/rain_showers_slight.png') },
    81: { description: 'Rain showers: Moderate', icon:require( '../assets/rain_showers_moderate.png') },
    82: { description: 'Rain showers: Violent', icon:require( '../assets/rain_showers_violent.png') },
    85: { description: 'Snow showers: Slight', icon: require('../assets/snow_showers_slight.png' )},
    86: { description: 'Snow showers: Heavy', icon:require( '../assets/snow_showers_heavy.png') },
};

export default weatherCodes;