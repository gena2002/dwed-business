import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import MyTable from "../@others/atoms/MyTable";
import {observer} from "mobx-react-lite";
import SearchInput from "../@others/atoms/SearchInput";
import ProductTypesRows from "./ProductTypesRows";

const head = [
    {id: 1, title: 'ID', props: {align: 'center'}},
    {id: 2, title: 'Name2'},
    {id: 3, title: 'Actions', props: {align: 'center'}},
]

const ProductTypesList = () => {
    const {store} = useContext(Context);

    const [limit, setLimit] = useState<number>(15);
    const [offset, setOffset] = useState<number>(0);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        store.admin_product_type.get_all(limit, offset, search).then(r => {
            console.log(r)
        })
    }, [limit, offset, search]);


    useEffect(() => {
        setOffset(0)
    }, [search])

    const reloadList = () => {
        store.admin_product_type.get_all(limit, offset, search)
    }

    try {
        return (<>
                <SearchInput value={search} onChange={setSearch}/>
                <br/>
                <MyTable
                    loading={store.admin_product_type.list_loader.getLoading()}
                    limit={limit}
                    offset={offset}
                    setLimit={setLimit}
                    setOffset={setOffset}
                    head={head}
                    rows_length={store.admin_product_type.getListData().count}
                    body={<ProductTypesRows loading={store.admin_product_type.list_loader.getLoading()}
                                           reloadRegionList={reloadList}
                                           rows={store.admin_product_type.getListData().results}/>}
                    next_offset={store.admin_product_type.getListData().next_offset}
                    previous_offset={store.admin_product_type.getListData().previous_offset}
                />
            </>
        );
    } catch (e) {
        return <div>Загрузка из RegionTypesList...</div>
    }

};

export default observer(ProductTypesList);