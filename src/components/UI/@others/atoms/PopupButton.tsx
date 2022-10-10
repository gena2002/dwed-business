import React, {useState} from 'react';
import Popup from "./Popup";
import Button from "@mui/material/Button";
import {Clipboard} from "iconsax-react";
import {observer} from "mobx-react-lite";

interface PopupButtonProps {
    title: React.ReactNode;
    children: React.ReactNode;
    style?: any;
    variant?: "text" | "contained" | "outlined" | undefined
}

const PopupButton = ({title, children, style, variant}: PopupButtonProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>  <Button style={style} variant={variant ? variant : "contained"} sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        }} onClick={() => setOpen(true)}>
            {title}
        </Button>
            <Popup open={open} onClose={() => setOpen(false)}>
                {children}
            </Popup>
        </>
    );
};

export default observer(PopupButton);