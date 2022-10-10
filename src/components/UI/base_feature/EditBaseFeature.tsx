import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import {Context} from "../../../context";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import ParentRowsPopup from "../@others/atoms/ListPopup";
import {observer} from "mobx-react-lite";
import LoadingButton from '@mui/lab/LoadingButton';
import T from "../@others/atoms/T";
import BaseFeaturePopup from "../@others/popups/BaseFeaturePopup";


const EditBaseFeature = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();

    const [id, setId] = useState<number | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    const [name, setName] = useState<string>('');

    const [current_parent, setCurrentParent] = React.useState<number>(NaN);
    const [current_parent_name, setCurrentParentName] = React.useState<string | null>(null);

    useEffect(() => {
        let _id = location.pathname.split('/')
        setId(Number(_id[_id.length - 1]))
    }, [location.pathname]);

    useEffect(() => {
        if (id !== null) {
            store.base_feature.get(id).then(r => {
                console.log(r)
                switch (r.status) {
                    case 200:
                        setName(r?.data?.name)
                        setCurrentParent(r?.data?.parent?.id)
                        setCurrentParentName(r?.data?.parent?.name)
                        setNotFound(false)
                        break;
                    case 404:
                        setNotFound(true)
                        break;
                }
            })
        }
    }, [id])


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
        if (!store.base_feature.patch_loader.getLoading() && id !== null) {
            store.base_feature.patch(id, name, current_parent)
                .then(r => {
                    console.log(r)
                    if (r.status === 200) {
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
                }} loading={store.base_feature.patch_loader.getLoading()}>{T('Create')}</LoadingButton>

            </Root>
        </>

    );
};

export default observer(EditBaseFeature);

const Root = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

