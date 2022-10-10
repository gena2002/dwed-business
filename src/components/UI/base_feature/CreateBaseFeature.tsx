import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import {Context} from "../../../context";
import MenuItem from '@mui/material/MenuItem';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import ParentRowsPopup from "../@others/atoms/ListPopup";
import {observer} from "mobx-react-lite";
import LoadingButton from '@mui/lab/LoadingButton';
import PopupButton from "../@others/atoms/PopupButton";
import RegionTypesListPopup from "../@others/popups/RegionTypesPopup";
import T from "../@others/atoms/T";
import BaseFeaturePopup from "../@others/popups/BaseFeaturePopup";


const CreateBaseFeature = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');

    const [current_parent, setCurrentParent] = React.useState<number>(NaN);
    const [current_parent_name, setCurrentParentName] = React.useState<string | null>(null);


    interface IError {
        field: string;
        error: boolean;
    }

    const [errors, setErrors] = useState<IError[]>([
        {field: 'name', error: false},
    ])


    const updateErrors = (index: number, error: boolean) => {
        let newArr = [...errors];
        newArr[index].error = error;
        setErrors(newArr);
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!store.base_feature.post_loader.getLoading()) {
            store.base_feature.post(name, current_parent)
                .then(r => {
                    console.log(r)
                    if (r.status === 201) {
                        setErrors([
                            {field: 'name', error: false},
                        ])
                        store.alert.setAlert(true, 'success', 'base_feature is created success');
                        navigate(`/base_feature/list?parent=${current_parent}&name=${current_parent_name}`)
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

    return (<>
            <Root
                onSubmit={(e) => submit(e)}
            >

                <TextField
                    error={errors.filter((obj) => {
                        return obj.field === 'name'
                    })[0].error}
                    value={name} onChange={(e) => setName(e.target.value)} fullWidth label="Name"
                    variant="outlined"/>


                <BaseFeaturePopup
                    setCurrentParent={setCurrentParent}
                    setCurrentParentName={setCurrentParentName}
                    current_parent={current_parent}
                    current_parent_name={current_parent_name}
                />

                <LoadingButton variant="contained" type={'submit'} sx={{
                    minWidth: '220px',
                    alignSelf: 'flex-end'
                }} loading={store.base_feature.post_loader.getLoading()}>{T('Create')}</LoadingButton>

            </Root>
        </>

    );
};

export default observer(CreateBaseFeature);

const Root = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

