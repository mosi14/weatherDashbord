import React from 'react';
import './App.css';
import HomePage from "./pages/Home";

/*interface City {
    name: string;
    display_name: string;
    lat: number;
    lon: number;
}

*/

const App: React.FC = () => {
    return (
        <>
            <HomePage/>
        </>
    );
};

export default App;