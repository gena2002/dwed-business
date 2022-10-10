import {Dialog, Slide} from "@mui/material";
import React from "react";
import {TransitionProps} from "@mui/material/transitions";

interface SimpleDialogProps {
    open: boolean;
    onClose: (e?:any) => void;
    children: React.ReactNode;
}


export default function Popup(props: SimpleDialogProps) {
    const {onClose, open} = props;

    return (
        <Dialog onClose={onClose}  open={open} scroll={'body'}>
            {props.children}
        </Dialog>
    );
}