import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import dropzone from "../../../assets/images/Dropzone.png";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ParentRowsPopup from "../@others/atoms/ListPopup";
import LoadingButton from "@mui/lab/LoadingButton";
import T from "../@others/atoms/T";
import styled from "styled-components";
import FlexRow from "../@others/atoms/FlexRow";
import BackButton from "../@others/atoms/BackButton";
import {Title24} from "../@others/atoms/Title24";
import ImageUpload from "../@others/atoms/ImageUpload";
import CategoryPopup from "../@others/popups/ProductCategoryPopup";
import {observer} from "mobx-react-lite";


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

const EditProductCategory = () => {
    const {store} = useContext(Context);
    const location = useLocation();


    const [name, setName] = useState<string>('');
    const [preview_link, setPreviewLink] = useState<string>('');
    const [status, setStatus] = useState<1 | 0>(1);
    const [image, setImage] = useState<string | null>(null);

    const [current_parent, setCurrentParent] = React.useState<number>(NaN);
    const [current_parent_name, setCurrentParentName] = React.useState<string | null>(null);


    useEffect(() => {console.log(current_parent, current_parent_name)}, [current_parent, current_parent_name])

    const [id, setId] = useState<number | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    useEffect(() => {
        let _id = location.pathname.split('/')
        setId(Number(_id[_id.length - 1]))
    }, [location.pathname]);

    useEffect(() => {
        if (id !== null) {
            store.admin_category.get(id).then(r => {
                console.log(r)
                if (r.status === 200) {
                    setName(store.admin_category.getData().name)
                    setStatus(store.admin_category.getData().status)
                    setCurrentParent(store.admin_category.getData()?.parent?.id)
                    setCurrentParentName(store.admin_category.getData()?.parent?.name)
                    setPreviewLink(store.admin_category.getData().image)
                    setNotFound(false)
                } else {
                    setNotFound(true)
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
        if (!store.admin_category.patch_loader.getLoading() && id !== null && !isNaN(id)) {
            store.admin_category.patch(id, name, status, current_parent, image)
                .then(r => {
                    console.log(r)
                    if (r.status === 200) {
                        setErrors([
                            {field: 'name', error: false},
                            {field: 'status', error: false},
                        ])
                        store.alert.setAlert(true, 'success', 'Region is created success');
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


    if (notFound) return <div>404 Error Page Not Found</div>

    return (<>
            <Root
                onSubmit={(e) => submit(e)}
            >

                <FlexRow>
                    <BackButton to={'/product_categories/list'}/>
                    <Title24>
                        Edit Product Category
                    </Title24>
                </FlexRow>

                <ImageUpload image={image} setImage={setImage} preview_link={preview_link}/>

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
                }} loading={store.admin_category.patch_loader.getLoading()}>{T('Save')}</LoadingButton>

            </Root>
        </>

    );
};

export default observer(EditProductCategory);


const Root = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
