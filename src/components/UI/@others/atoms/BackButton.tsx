import React, {useContext, useEffect} from 'react';
import {ArrowLeft} from "iconsax-react";
import {useNavigate} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Context} from "../../../../context";

type Props = {
    to: string;
    tooltip?: string;
}

const BackButton = ({to, tooltip}: Props) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {store} = useContext(Context);

    // useEffect(() => {
    //     console.log(store.getPreviousPage())
    // }, [])

    return (<Tooltip title={`${tooltip === undefined ? t("Back") : tooltip}`}>
            <ArrowLeft
                onClick={() => navigate(store.getPreviousPage() !== '' ? store.getPreviousPage() : to)}
                size="32"
                color="#7F92A0"
                style={{
                    cursor: 'pointer'
                }}
            />
        </Tooltip>
    );
};

export default BackButton;
