import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";
import T from "../@others/atoms/T";
import {observer} from "mobx-react-lite";
import {TRequiredFormat} from "../../../models/@others/TRequiredFormat";
import MenuItem from "@mui/material/MenuItem";
import ParentRowsPopup from "../@others/atoms/ListPopup";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CategoryPopup from "../@others/popups/ProductCategoryPopup";
import BaseFeaturePopup from "../@others/popups/BaseFeaturePopup";

const required_format_demo = [
    {
        value: 1,
        label: 'SelectField',
    },
    {
        value: 2,
        label: 'CharField',
    },
    {
        value: 3,
        label: 'TextField',
    },
    {
        value: 4,
        label: 'NumberField',
    },
    {
        value: 9,
        label: 'BooleanField',
    },
    {
        value: 10,
        label: 'DateField',
    },
    {
        value: 11,
        label: 'ColourField',
    },
    {
        value: 12,
        label: 'YearField',
    },
]


const CreateFeature = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const [current_category_parent, setCurrentCategoryParent] = React.useState<number>(NaN);
    const [current_category_parent_name, setCurrentCategoryParentName] = React.useState<string | null>(null);

    const [current_base_feature_parent, setCurrentBaseFeatureParent] = React.useState<number>(NaN);
    const [current_base_feature_parent_name, setCurrentBaseFeatureParentName] = React.useState<string | null>(null);


    const [name, setName] = useState<string>('');
    const [required, setRequired] = useState<boolean>(false);
    const [multi_values, setMultiValues] = useState<boolean>(false);
    const [prepared_values, setPreparedValues] = useState<number[]>([]);
    const [required_format, setRequiredFormat] = useState<TRequiredFormat>(3);

    // useEffect(() => {
    //     store.admin_category.get_all(limit, offset, parent, search, null)
    //     store.base_feature.get_all(limit, offset, current_base_feature_parent, search).then(r => console.log(r))
    // }, [parent, limit, offset, search]);

    interface IError {
        field: string;
        error: boolean;
    }

    const [errors, setErrors] = useState<IError[]>([
        {field: 'name', error: false},
        {field: 'required_format', error: false},
    ])

    const updateErrors = (index: number, error: boolean) => {
        let newArr = [...errors];
        newArr[index].error = error;
        setErrors(newArr);
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!store.admin_feature.post_loader.getLoading()) {
            store.admin_feature.post(name, required_format, required, multi_values, current_category_parent, prepared_values)
                .then(r => {
                    console.log(r)
                    if (r.status === 201) {
                        setErrors([
                            {field: 'name', error: false},
                            {field: 'required_format', error: false},
                        ])
                        store.alert.setAlert(true, 'success', 'Feature is created success');
                        navigate(`/features/list`)
                    } else {
                        console.log(r)
                        r.data.some((obj: { field: string; }, i: number) => {
                            if (obj.field === errors[i].field) {
                                updateErrors(i, true)
                            }
                        })
                        let message = '';
                        for (let i = 0; i < r.data.length; i++) {
                            for (let k = 0; k < r.data[i].message.length; k++) {
                                message += `error in filed: ${r.data[i].field}. ${r.data[i].message[k]} \n`
                            }
                        }
                        store.alert.setAlert(true, 'error', message);
                    }
                })
        }

    }

    function onRequiredFormatChange(e: any) {
        e.preventDefault();
        // 1 | 2 | 3 | 4 | 9 | 10 | 11 | 12
        let v = e.target.value;
        let r: TRequiredFormat = v === 1 ? 1 : v === 2 ? 2 : v === 3 ? 3 : v === 4 ? 4 : v === 9 ? 9 : v === 10 ? 10 : v === 11 ? 11 : v === 12 ? 12 : 12;
        setRequiredFormat(r)
    }


    return (
        <Root
            onSubmit={(e) => submit(e)}
        >
            <TextField
                error={errors.filter((obj) => {
                    return obj.field === 'name'
                })[0].error}
                value={name} onChange={(e) => setName(e.target.value)} fullWidth label="Name"
                variant="outlined"/>


            <TextField
                select
                error={errors.filter((obj) => {
                    return obj.field === 'required_format'
                })[0].error}
                label="required format"
                value={required_format}
                onChange={(e) => onRequiredFormatChange(e)}
            >
                {required_format_demo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <FormControlLabel control={<Checkbox checked={required} onChange={() => setRequired(!required)}/>}
                              label="is required"/>

            <FormControlLabel
                control={<Checkbox checked={multi_values} onChange={() => setMultiValues(!multi_values)}/>}
                label="is multi_values"/>


            <CategoryPopup
                current_parent={current_category_parent}
                current_parent_name={current_category_parent_name}
                setCurrentParent={setCurrentCategoryParent}
                setCurrentParentName={setCurrentCategoryParentName}
            />

            <BaseFeaturePopup
                current_parent={current_base_feature_parent}
                current_parent_name={current_base_feature_parent_name}
                setCurrentParent={setCurrentBaseFeatureParent}
                setCurrentParentName={setCurrentBaseFeatureParentName}
            />

            <LoadingButton variant="contained" type={'submit'} sx={{
                minWidth: '220px',
                alignSelf: 'flex-start'
            }} loading={store.admin_feature.post_loader.getLoading()}>{T('Create')}</LoadingButton>

        </Root>
    );
};

export default observer(CreateFeature);

const Root = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;