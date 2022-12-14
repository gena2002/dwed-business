import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import MyTable from "../@others/atoms/MyTable";
import {observer} from "mobx-react-lite";
import SearchInput from "../@others/atoms/SearchInput";
import OfficialFieldsRows from "./OfficialFieldsRows";

const head = [
    {id: 1, title: 'id', props: {align: 'center'}},
    {id: 2, title: 'name'},
    {id: 3, title: 'country'},
    {id: 4, title: 'is_required'},
    {id: 5, title: 'actions', props: {align: 'right'}},
]

const OfficialFieldsList = () => {
    const {store} = useContext(Context);

    const [limit, setLimit] = useState<number>(15);
    const [offset, setOffset] = useState<number>(0);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        store.admin_official_field.get_all(limit, offset, search).then(r => {
            console.log(r)
        })
    }, [limit, offset, search]);


    useEffect(() => {
        setOffset(0)
    }, [search])

    const reloadList = () => {
        store.admin_official_field.get_all(limit, offset, search)
    }


    try {
        return (<>
                <SearchInput value={search} onChange={setSearch}/>
                <br/>
                <MyTable
                    loading={store.admin_official_field.list_loader.getLoading()}
                    limit={limit}
                    offset={offset}
                    setLimit={setLimit}
                    setOffset={setOffset}
                    head={head}
                    rows_length={store.admin_official_field.getListData().count}
                    body={<OfficialFieldsRows loading={store.admin_official_field.list_loader.getLoading()}
                                            reloadRegionList={reloadList}
                                            rows={store.admin_official_field.getListData().results}/>}
                    next_offset={store.admin_official_field.getListData().next_offset}
                    previous_offset={store.admin_official_field.getListData().previous_offset}
                />
            </>
        );
    } catch (e) {
        return <div>???????????????? ???? RegionTypesList...</div>
    }

};

export default observer(OfficialFieldsList);