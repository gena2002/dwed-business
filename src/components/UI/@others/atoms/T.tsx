import React from 'react';
import {useTranslation} from "react-i18next";

const T = (value: string) => {
    const {t} = useTranslation();
    return t(`${value}`);
};

export default T;