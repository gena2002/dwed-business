import {Dialog, Slide} from "@mui/material";
import React from "react";
import {TransitionProps} from "@mui/material/transitions";

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function SimpleDialog(props: SimpleDialogProps) {
    const {onClose, open} = props;

    return (
        <Dialog open={open} fullScreen TransitionComponent={Transition}>
            {props.children}
        </Dialog>
    );
}