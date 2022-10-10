import React, {useEffect} from 'react';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {IDrawerParams} from "../../../../stores/@others/drawerItems";
import {useLocation, useNavigate} from "react-router-dom";

type Props = {
    item: IDrawerParams
}

const MyListItem = ({item}: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <ListItem key={item.id} disablePadding onClick={() => item?.location && navigate(item?.location)}>
            <ListItemButton selected={`/${location.pathname.split('/')[1]}` === item?.location && true}>
                <ListItemIcon sx={{
                    minWidth: '40px'
                }}>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title}/>
            </ListItemButton>
        </ListItem>
    );
};

export default MyListItem;
