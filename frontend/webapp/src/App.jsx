import React from 'react';
import Login from "./Login";
import {theme} from "./theme.js";
import {ThemeProvider} from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Login/>
        </ThemeProvider>
    );
}

export default App;