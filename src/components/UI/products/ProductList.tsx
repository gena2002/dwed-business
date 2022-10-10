import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import MyTable from "../@others/atoms/MyTable";
import {observer} from "mobx-react-lite";
import SearchInput from "../@others/atoms/SearchInput";
import ProductRows from "./ProductRows";
import {IManufacturer} from "../../../models/pms/admin_manufacturer/IManufacturer";
import {INameId} from "../../../models/@others/INameId";

const head = [
    {id: 1, title: 'ID', props: {align: 'center'}},
    // {id: 2, title: 'code', props: {align: 'center'}},
    {id: 3, title: 'Name2'},
    {id: 4, title: 'unit'},
    {id: 5, title: 'status'},
    {id: 6, title: 'manufacturer'},
    {id: 7, title: 'type'},
    {id: 8, title: 'category'},
    // {id: 9, title: 'create_date'},
    // {id: 10, title: 'update_date'},
    {id: 11, title: 'Actions', props: {align: 'right'}},
]

const ProductList = () => {
    const {store} = useContext(Context);

    const [limit, setLimit] = useState<number>(15);
    const [offset, setOffset] = useState<number>(0);

    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        store.admin_product.get_all(limit, offset, search)
    }, [limit, offset, search]);


    const reloadRegionList = () => {
        store.admin_product.get_all(limit, offset, search)
    }


    useEffect(() => {
        setOffset(0)
    }, [search])

    try {

        return (<>
                <SearchInput value={search} onChange={setSearch}/>
                <br/>
                <MyTable
                    loading={store.admin_product.list_loader.getLoading()}
                    limit={limit}
                    offset={offset}
                    setLimit={setLimit}
                    setOffset={setOffset}
                    head={head}
                    rows_length={store.admin_product.getListData().count}
                    body={<ProductRows reloadRegionList={reloadRegionList}
                                       rows={store.admin_product.getListData().results}/>}
                    next_offset={store.admin_product.getListData().next_offset}
                    previous_offset={store.admin_product.getListData().previous_offset}
                />
            </>
        );
    } catch (e) {
        return <div>Загрузка из RegionList...</div>
    }

};

export default observer(ProductList);