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
import {useTranslation} from "react-i18next";
import FlexRow from "../@others/atoms/FlexRow";
import BackButton from "../@others/atoms/BackButton";
import {Title24} from "../@others/atoms/Title24";
import RegionsPopup from "../@others/popups/RegionsPopup";
import RegionTypesPopup from "../@others/popups/RegionTypesPopup";

const statuses_demo = [
    {
        value: 'true',
        label: 'active',
    },
    {
        value: 'false',
        label: 'not active',
    },
]

const EditRegionForm = () => {
    const {store} = useContext(Context);

    const location = useLocation();
    const {t} = useTranslation();

    const [id, setId] = useState<number | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<boolean>(true);

    const [type, setType] = useState<number>(NaN);
    const [type_name, setTypeName] = useState<string | null>(null);

    const [current_parent, setCurrentParent] = React.useState<number>(NaN);
    const [current_parent_name, setCurrentParentName] = React.useState<string | null>(null);


    useEffect(() => {
        let _id = location.pathname.split('/')
        console.log(_id)
        setId(Number(_id[_id.length - 1]))
    }, [location.pathname]);

    useEffect(() => {
        if (id !== null) {
            store.admin_region.get(id).then(r => {
                console.log(r)
                switch (r.status) {
                    case 200:
                        setName(r?.data?.name)
                        setStatus(r?.data?.status)
                        setCurrentParent(r?.data?.parent?.id)
                        setCurrentParentName(r?.data?.parent?.name)
                        setType(r?.data?.type?.id)
                        setTypeName(r?.data?.type?.name)
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
        {field: 'status', error: false},
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
        if (!store.admin_region.patch_loader.getLoading() && id !== null) {
            store.admin_region.patch(id, name, status, current_parent, type)
                .then(r => {
                    console.log(r)

                    switch (r.status) {
                        case 200:
                            setErrors([
                                {field: 'name', error: false},
                                {field: 'status', error: false},
                            ])
                            store.alert.setAlert(true, 'success', 'Region is updated success');
                            break;
                        case 400:
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
                            break;
                    }

                })
        }

    }

    if (store.admin_region.get_loader.getLoading()) return <div>Loading from EditRegionType</div>
    if (notFound) return <div>404 Error Page Not Found</div>

    return (<>
            <FlexRow>
                <BackButton to={'/regions/list'}/>
                <Title24>
                    Edit Region
                </Title24>
            </FlexRow>
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
                        return obj.field === 'status'
                    })[0].error}
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value === 'true')}
                >
                    {statuses_demo.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <RegionsPopup
                    current_parent={current_parent}
                    setCurrentParent={setCurrentParent}
                    setCurrentParentName={setCurrentParentName}
                    current_parent_name={current_parent_name}
                />

                <RegionTypesPopup type={type} type_name={type_name} setType={setType} setTypeName={setTypeName}/>

                <LoadingButton variant="contained" type={'submit'} sx={{
                    minWidth: '220px',
                    alignSelf: 'flex-end'
                }} loading={store.admin_region.patch_loader.getLoading()}>{t("Save")}</LoadingButton>

            </Root>
        </>

    );
};

export default observer(EditRegionForm);

const Root = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

