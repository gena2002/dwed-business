import React, {useContext} from 'react';
import i18n from '../../../../i18n';
import useLocalStorage from "../../../../hooks/useLocalStorage";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {Context} from "../../../../context";
import {observer} from "mobx-react-lite";


const languages = [
    {
        value: 'ru',
        label: 'Русский',
    },
    {
        value: 'en',
        label: 'English',
    },

];

const TranslationButton = () => {
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    const {store} = useContext(Context);
    return (
        <div>
            <TextField
                select
                variant="standard"
                InputProps={{ disableUnderline: true }}
                value={language}
                onChange={(e) => {
                    i18n.changeLanguage(e.target.value);
                    setLanguage(e.target.value);
                    store.setLang(e.target.value)
                }}
            >
                {languages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};

export default observer(TranslationButton);