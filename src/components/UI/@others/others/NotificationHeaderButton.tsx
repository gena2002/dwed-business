import React from 'react';
import IconButton from "@mui/material/IconButton";
import {Badge} from "@mui/material";
import {Notification} from "iconsax-react";
import Tooltip from "@mui/material/Tooltip";

const NotificationHeaderButton = () => {
    return (
        <Tooltip title="Notification">
            <IconButton
                size="small"
            >
                <Badge badgeContent={4} color="error">
                    <Notification
                        size="24"
                        color="#7F92A0"
                    />
                </Badge>
            </IconButton>
        </Tooltip>
    );
};

export default NotificationHeaderButton;
