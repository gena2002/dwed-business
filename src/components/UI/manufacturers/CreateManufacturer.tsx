import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import {useLocation, useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";
import T from "../@others/atoms/T";
import {observer} from "mobx-react-lite";

const CreateManufacturer = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState<string>('');

    interface IError {
        field: string;
        error: boolean;
    }

    const [errors, setErrors] = useState<IError[]>([
        {field: 'name', error: false},
    ])

    useEffect(() => {
        console.log(
            errors
        )
    }, [errors])


    const updateErrors = (index: number, error: boolean) => {
        let newArr = [...errors];
        newArr[index].error = error;
        setErrors(newArr);
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!store.admin_manufacturer.post_loader.getLoading()) {
            store.admin_manufacturer.post(name, null)
                .then(r => {
                    console.log(r)
                    if (r.status === 201) {
                        setErrors([
                            {field: 'name', error: false},
                        ])
                        store.alert.setAlert(true, 'success', 'Manufacturer is created success');
                        navigate(`/manufacturers/list`)
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

    return (
        <Root
            onSubmit={(e) => submit(e)}
        >
            <TextField
                error={errors.filter((obj) => {
                    return obj.field === 'name'
                })[0].error}
                value={name} onChange={(e) => setName(e.target.value)} fullWidth label={T('Name2')}
                variant="outlined"/>

            <LoadingButton variant="contained" type={'submit'} sx={{
                minWidth: '220px',
                alignSelf: 'flex-start'
            }} loading={store.admin_manufacturer.post_loader.getLoading()}>{T('Create')}</LoadingButton>

        </Root>
    );
};

export default observer(CreateManufacturer);

const Root = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;