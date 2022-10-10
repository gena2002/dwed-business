import React, {useContext, useEffect, useState} from 'react';
import ProductCategoryPopup from "../@others/popups/ProductCategoryPopup";
import ProductTypePopup from "../@others/popups/ProductTypePopup";
import ManufacturerPopup from "../@others/popups/ManufacturerPopup";
import styled from "styled-components";
import {Context} from "../../../context";
import {useLocation, useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import T from "../@others/atoms/T";
import {category} from "../../../endpoints/cdms";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";


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
    const location = useLocation();
    const {t} = useTranslation();

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

    const [id, setId] = useState<number | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        let _id = location.pathname.split('/')
        console.log(_id)
        setId(Number(_id[_id.length - 1]))
    }, [location.pathname]);

    useEffect(() => {
        if (id !== null) {
            store.admin_product.get(id).then(r => {
                console.log(r)
                switch (r.status) {
                    case 200:
                        setName(store.admin_product.getData().name)
                        setUnit(store.admin_product.getData().unit)
                        setDescription(store.admin_product.getData().description)
                        setStatus(store.admin_product.getData().status)
                        setCurrentCategoryParent(store.admin_product.getData().category.id)
                        setCurrentCategoryParentName(store.admin_product.getData().category.name)
                        setType(store.admin_product.getData().type.id)
                        setTypeName(store.admin_product.getData().type.name)
                        setManufacturer(store.admin_product.getData().manufacturer.id)
                        setManufacturerName(store.admin_product.getData().manufacturer.name)
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
        if (!store.admin_product.patch_loader.getLoading() && id !== null) {
            store.admin_product.patch(id, name, description, status, manufacturer, type, current_category_parent, unit)
                .then(r => {
                    console.log(r)
                    if (r.status === 200) {
                        setErrors([
                            {field: 'name', error: false},
                            {field: 'status', error: false},
                            {field: 'description', error: false},
                            {field: 'unit', error: false},
                        ])
                        store.alert.setAlert(true, 'success', 'Product is updated success');
                    } else {
                        console.log(r)
                        r.data.some((obj: { field: string; }) => {
                            for (let i = 0; i < errors.length; i++) {
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


    if (store.admin_product.get_loader.getLoading()) return <div>Loading from EditProduct</div>
    if (notFound) return <div>404 Error Page Not Found</div>

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
            }} loading={store.admin_product.patch_loader.getLoading()}>{t('Save')}</LoadingButton>
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
