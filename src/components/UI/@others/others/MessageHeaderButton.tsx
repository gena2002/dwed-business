import React from 'react';
import IconButton from "@mui/material/IconButton";
import {Badge} from "@mui/material";
import {Message} from "iconsax-react";
import Tooltip from "@mui/material/Tooltip";

const MessageHeaderButton = () => {
    return (
        <Tooltip title="Message">
            <IconButton
                size="small"
            >
                <Badge badgeContent={1} color="error">
                    <Message
                        size="24"
                        color="#7F92A0"
                    />
                </Badge>
            </IconButton>
        </Tooltip>
    );
};

export default MessageHeaderButton;
