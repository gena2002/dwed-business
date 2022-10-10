import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import {Context} from "../../../context";
import MenuItem from '@mui/material/MenuItem';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import ParentRowsPopup from "../@others/atoms/ListPopup";
import {observer} from "mobx-react-lite";
import LoadingButton from '@mui/lab/LoadingButton';
import T from "../@others/atoms/T";
import dropzone from '../../../assets/images/Dropzone.png'
import ImageUpload from "../@others/atoms/ImageUpload";
import CategoryPopup from "../@others/popups/ProductCategoryPopup";

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

const CreateProductCategoryForm = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();


    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<1 | 0>(1);
    const [image, setImage] = useState<string>('');

    const [current_parent, setCurrentParent] = React.useState<number>(NaN);
    const [current_parent_name, setCurrentParentName] = React.useState<string | null>(null);


    useEffect(() => {
        setStatus(1)
    }, [])

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
        console.log(current_parent)
        if (!store.admin_category.post_loader.getLoading()) {
            store.admin_category.post(name, status, current_parent, image)
                .then(r => {
                    console.log(r)
                    if (r.status === 201) {
                        setErrors([
                            {field: 'name', error: false},
                            {field: 'status', error: false},
                        ])
                        store.alert.setAlert(true, 'success', 'Product Category is created success');
                        navigate(`/product_categories/list?parent=${current_parent}&name=${current_parent_name}`)
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

                <ImageUpload image={image} setImage={setImage}/>

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
                    value={status === 1 ? 'true' : 'false'}
                    onChange={(e) => setStatus(e.target.value === 'true' ? 1 : 0)}
                >
                    {statuses_demo.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <CategoryPopup
                    current_parent={current_parent}
                    current_parent_name={current_parent_name}
                    setCurrentParent={setCurrentParent}
                    setCurrentParentName={setCurrentParentName}
                />

                <LoadingButton variant="contained" type={'submit'} sx={{
                    minWidth: '220px',
                    alignSelf: 'flex-end'
                }} loading={store.admin_category.post_loader.getLoading()}>{T('Create')}</LoadingButton>

            </Root>
        </>

    );
};

export default observer(CreateProductCategoryForm);

const Root = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;