import React from 'react';
import {useNavigate} from "react-router-dom";

type LinkButtonProps = {
    to: string;
    children: React.ReactNode;
}

const NavigateButton = ({to, children}:LinkButtonProps) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(to)}>
            {children}
        </div>
    );
};

export default NavigateButton;
