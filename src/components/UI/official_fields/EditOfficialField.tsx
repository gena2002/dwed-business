import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import {useLocation, useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";
import {observer} from "mobx-react-lite";
import FlexRow from "../@others/atoms/FlexRow";
import BackButton from "../@others/atoms/BackButton";
import {Title24} from "../@others/atoms/Title24";
import {useTranslation} from "react-i18next";

const EditOfficialField = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();

    const [name, setName] = useState<string>('');
    const [id, setId] = useState<number | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        let _id = location.pathname.split('/')
        console.log(_id)
        setId(Number(_id[_id.length - 1]))
    }, [location.pathname]);

    useEffect(() => {
        if (id !== null) {
            store.admin_official_field.get(id).then(r => {
                console.log(r)
                switch (r.status) {
                    case 200:
                        setName(r?.data?.name)
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
        if (!store.admin_official_field.patch_loader.getLoading() && id !== null) {
            store.admin_official_field.patch(id, name, true, 1)
                .then(r => {
                    console.log(r)

                    if (r.status === 200) {
                        setErrors([
                            {field: 'name', error: false},
                        ])
                        store.alert.setAlert(true, 'success', 'Official Field is updated success');
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

    if (store.admin_official_field.get_loader.getLoading()) return <div>Loading from EditRegionType</div>
    if (notFound) return <div>404 Error Page Not Found</div>

    return (
        <Root
            onSubmit={(e) => submit(e)}
        >
            <FlexRow>
                <BackButton to={'/official_fields/list'}/>
                <Title24>
                    Edit Official Fields
                </Title24>
            </FlexRow>
            <TextField
                error={errors.filter((obj) => {
                    return obj.field === 'name'
                })[0].error}
                value={name} onChange={(e) => setName(e.target.value)} fullWidth label="Name"
                variant="outlined"/>

            <LoadingButton variant="contained" type={'submit'} sx={{
                minWidth: '220px',
                alignSelf: 'flex-start'
            }} loading={store.admin_official_field.post_loader.getLoading()}>{t("Save")}</LoadingButton>

        </Root>
    );
};

export default observer(EditOfficialField);

const Root = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;