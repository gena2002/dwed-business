import React, {useContext, useState} from 'react';
import ProductCategoryPopup from "../@others/popups/ProductCategoryPopup";
import ProductTypePopup from "../@others/popups/ProductTypePopup";
import ManufacturerPopup from "../@others/popups/ManufacturerPopup";
import styled from "styled-components";
import {Context} from "../../../context";
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import T from "../@others/atoms/T";
import {category} from "../../../endpoints/cdms";
import {observer} from "mobx-react-lite";


const statuses_demo = [
    {
        value: 'true',
        label: '1',
    },
    {
        value: 'false',
        label: '0',
    },
]

const CreateProduct = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [unit, setUnit] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<number>(1);

    const [current_category_parent, setCurrentCategoryParent] = React.useState<number>(NaN);
    const [current_category_parent_name, setCurrentCategoryParentName] = React.useState<string | null>(null);
    const [type, setType] = useState<number>(NaN);
    const [type_name, setTypeName] = useState<string | null>(null);

    const [manufacturer, setManufacturer] = useState<number>(NaN);
    const [manufacturer_name, setManufacturerName] = useState<string | null>(null);

    interface IError {
        field: string;
        error: boolean;
    }

    const [errors, setErrors] = useState<IError[]>([
        {field: 'name', error: false},
        {field: 'status', error: false},
        {field: 'description', error: false},
        {field: 'unit', error: false},
    ])

    const updateErrors = (index: number, error: boolean) => {
        let newArr = [...errors];
        newArr[index].error = error;
        setErrors(newArr);
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!store.admin_product.post_loader.getLoading()) {
            store.admin_product.post(name, description, status, manufacturer, type, current_category_parent, unit)
                .then(r => {
                    console.log(r)
                    if (r.status === 201) {
                        setErrors([
                            {field: 'name', error: false},
                            {field: 'status', error: false},
                            {field: 'description', error: false},
                            {field: 'unit', error: false},
                        ])
                        store.alert.setAlert(true, 'success', 'Product is created success');
                        navigate(`/products/list/${r.data.id}`)
                    } else {
                        console.log(r)
                        r.data.some((obj: { field: string; }) => {
                            for (let i = 0; i < errors.length; i++){
                                if (obj.field === errors[i].field) {
                                    updateErrors(i, true)
                                }
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
        <Root onSubmit={(e) => submit(e)}>

            <TextField
                error={errors.filter((obj) => {
                    return obj.field === 'name'
                })[0].error}
                value={name} onChange={(e) => setName(e.target.value)} fullWidth label="Name"
                variant="outlined"/>


            <TextField

                error={errors.filter((obj) => {
                    return obj.field === 'description'
                })[0].error}
                multiline
                rows={4}
                value={description} onChange={(e) => setDescription(e.target.value)} fullWidth label="Description"
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

            <TextField
                error={errors.filter((obj) => {
                    return obj.field === 'unit'
                })[0].error}
                value={unit} onChange={(e) => setUnit(e.target.value)} fullWidth label="Unit"
                variant="outlined"/>

            <ManufacturerPopup
                manufacturer_name={manufacturer_name}
                setManufacturerName={setManufacturerName}
                manufacturer={manufacturer}
                setManufacturer={setManufacturer}
            />
            <ProductTypePopup
                type={type}
                setType={setType}
                type_name={type_name}
                setTypeName={setTypeName}/>

            <ProductCategoryPopup
                current_parent={current_category_parent}
                current_parent_name={current_category_parent_name}
                setCurrentParent={setCurrentCategoryParent}
                setCurrentParentName={setCurrentCategoryParentName}
            />

            <LoadingButton variant="contained" type={'submit'} sx={{
                minWidth: '220px',
                alignSelf: 'flex-end'
            }} loading={store.admin_product.post_loader.getLoading()}>{T('Create')}</LoadingButton>
        </Root>
    );
};

export default observer(CreateProduct);

const Root = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
