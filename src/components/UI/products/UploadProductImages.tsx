import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../context";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CropperPopup from "../@others/popups/CropperPopup";

const UploadProductImages = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();

    const [id, setId] = useState<number | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);

    const [limit, setLimit] = useState<number>(5);
    const [offset, setOffset] = useState<number>(0);
    const [status, setStatus] = useState<boolean>(true);
    const [main, setMain] = useState<boolean>(true);
    // const [file, setFile] = useState<string>('');

    useEffect(() => {
        let _id = location.pathname.split('/')
        setId(Number(_id[_id.length - 1]))
    }, [location.pathname]);

    useEffect(() => {
        if (id !== null) {
            store.admin_product.get_all_image(id, limit, offset).then(r => {
                console.log(r)
                switch (r.status) {
                    case 200:
                        setNotFound(false)
                        break;
                    case 404:
                        setNotFound(true)
                        break;
                }
            })
        }
    }, [id])


    const upload_image = (file: any) => {
        if (id !== null) {
            store.admin_product.post_image(id, file, status, main).then(r => {
                console.log(r)
            })
        }
        console.log(file)
    }

    if (notFound) return <></>
    if (store.admin_product.get_loader.getLoading()) return <></>

    return (
        <div>
            <CropperPopup onCrop={upload_image}/>
        </div>
    );
};

export default observer(UploadProductImages);