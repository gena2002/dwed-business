import React from 'react';
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {observer} from "mobx-react-lite";

const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://dev.dwed.biz">
                DWED
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default observer(Copyright);