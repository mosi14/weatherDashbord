import React from 'react';
import {Autocomplete, Box, Grid, Paper, TextField} from "@mui/material";
import {useAppSelector} from "../app/hooks";
import {City} from "../interfaces/city";
import CityCard from "./CityCard";

interface SideBarProps {
    onSelectedCity: (city: City) => void;
    onInputValue: (value: string) => void
}

export default function SideBar({onSelectedCity, onInputValue}: SideBarProps) {
    const {cities} = useAppSelector(state => state.citySearch);

    return (
        <Paper sx={{height: '100%', p: 2}}>
            <Box sx={{mx: 3}}>
                <Autocomplete
                    freeSolo
                    disableClearable
                    id="combo-box-demo"
                    options={cities.map((city) => city.display_name)}
                    onInputChange={(event, newInputValue) => {
                        onInputValue(newInputValue);
                        //console.log(inputValue)
                    }}
                    onChange={(event, newValue) => {
                        const selected = cities.find(city => city.display_name === newValue);
                        if (selected) {
                            onSelectedCity(selected);
                        } else {
                            onSelectedCity({
                                name: 'London',
                                display_name: 'London, Greater London, England, United Kingdom',
                                lat: 51.5074,
                                lon: -0.1278
                            });
                        }
                    }}
                    renderInput={(params) =>
                        <TextField {...params}
                                   label="Search city"
                                   InputProps={{
                                       ...params.InputProps,
                                       type: 'search',
                                   }}
                        />}
                />
            </Box>
            <Box >
                <CityCard/>
            </Box>
        </Paper>
    )
}