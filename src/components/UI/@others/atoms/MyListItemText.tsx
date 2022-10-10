import React from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

type Props = {
    primary: string;
    secondary: string;
}

const MyListItemText = ({primary, secondary}:Props) => {
    return (
        <div style={{minWidth: 220}}>
            <ListItem sx={{
                padding: '0',
            }}>
                <ListItemText primary={primary} secondary={secondary} sx={{
                    flexDirection: 'column-reverse',
                    display: 'flex',
                    padding: '0'
                }}/>
            </ListItem>
            {/*<Divider component="li"/>*/}
        </div>
    );
};

export default MyListItemText;
