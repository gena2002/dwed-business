import React, {useContext} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {options} from "./styles/mui_theme";
import {routers} from "./routers/routers";
import {observer} from "mobx-react-lite";
import {Context} from "./context";
import {RenderRoutes} from "./gears";

const App = () => {
    const theme = createTheme(options);
    const {store} = useContext(Context);
    return (
        <ThemeProvider theme={theme}>
            <RenderRoutes routers={routers(store)}/>
        </ThemeProvider>
    );
}

export default observer(App);