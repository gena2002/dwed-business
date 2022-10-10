import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../context";
import ListPopup from "../atoms/ListPopup";
import {useTranslation} from "react-i18next";

type Props = {
    type: number;
    setType: Dispatch<SetStateAction<number>>;
    type_name: string | null;
    setTypeName: Dispatch<SetStateAction<string | null>>;
}

const ProductTypePopup = ({type, setType, type_name, setTypeName}: Props) => {
    const {store} = useContext(Context);
    const location = useLocation();
    const {t} = useTranslation();
    const [limit, setLimit] = useState<number>(5); //limit for ParentsRowsPopup
    const [offset, setOffset] = useState<number>(0);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        store.admin_product_type.get_all(limit, offset, search)
    }, [limit, offset, search]);


    return (<>
            <ListPopup
                search={search}
                setSearch={setSearch}
                title={'Enter Product Type'}
                rows={store.admin_product_type.getListData().results}
                loading={store.admin_product_type.list_loader.getLoading()}
                offset={offset}
                setOffset={setOffset}
                next_offset={store.admin_product_type.getListData().next_offset}
                previous_offset={store.admin_product_type.getListData().previous_offset}
                count={Number(store.admin_product_type.getListData().count)}
                current={type}
                setCurrent={setType}
                current_name={type_name}
                setCurrentName={setTypeName}
            />
        </>

    );
};

export default observer(ProductTypePopup);

