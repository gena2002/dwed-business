import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import {observer} from "mobx-react-lite";
import SearchInput from "../@others/atoms/SearchInput";
import MyTable from "../@others/atoms/MyTable";
import ManufacturerRows from "./ManufacturerRows";

const head = [
    {id: 1, title: 'id', props: {align: 'center'}},
    {id: 2, title: 'name'},
    {id: 3, title: 'org'},
    {id: 4, title: 'actions', props: {align: 'right'}},
]

const ManufacturersList = () => {
    const {store} = useContext(Context);

    const [limit, setLimit] = useState<number>(15);
    const [offset, setOffset] = useState<number>(0);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        store.admin_manufacturer.get_all(limit, offset, search, null).then(r => {
            console.log(r)
        })
    }, [limit, offset, search]);


    useEffect(() => {
        setOffset(0)
    }, [search])

    const reloadList = () => {
        store.admin_manufacturer.get_all(limit, offset, search, null)
    }

    try {
        return (<>
                <SearchInput value={search} onChange={setSearch}/>
                <br/>
                <MyTable
                    loading={store.admin_manufacturer.list_loader.getLoading()}
                    limit={limit}
                    offset={offset}
                    setLimit={setLimit}
                    setOffset={setOffset}
                    head={head}
                    rows_length={store.admin_manufacturer.getListData().count}
                    body={<ManufacturerRows loading={store.admin_manufacturer.list_loader.getLoading()}
                                            reloadRegionList={reloadList}
                                            rows={store.admin_manufacturer.getListData().results}/>}
                    next_offset={store.admin_manufacturer.getListData().next_offset}
                    previous_offset={store.admin_manufacturer.getListData().previous_offset}
                />
            </>
        );
    } catch (e) {
        return <div>Загрузка из RegionTypesList...</div>
    }

};

export default observer(ManufacturersList);