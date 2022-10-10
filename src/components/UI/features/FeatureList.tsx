import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import MyTable from "../@others/atoms/MyTable";
import {observer} from "mobx-react-lite";
import FeatureRows from "./FeatureRows";
import SearchInput from "../@others/atoms/SearchInput";
import {TRequiredFormat} from "../../../models/@others/TRequiredFormat";
import {TStatus} from "../../../models/@others/TStatus";

const head = [
    {id: 1, title: 'id', props: {align: 'center'}},
    {id: 2, title: 'name'},
    {id: 3, title: 'category'},
    {id: 4, title: 'multi_values'},
    {id: 5, title: 'required'},
    {id: 6, title: 'required_format'},
    {id: 7, title: 'actions', props: {align: 'right'}},
]

const RegionTypesList = () => {
    const {store} = useContext(Context);

    const [limit, setLimit] = useState<number>(15);
    const [offset, setOffset] = useState<number>(0);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        store.admin_feature.get_all(limit, offset).then(r => {
            console.log(r)
        })
    }, [limit, offset, search]);


    useEffect(() => {
        setOffset(0)
    }, [search])

    const reloadList = () => {
        store.admin_feature.get_all(limit, offset)
    }

    try {
        return (<>
                <SearchInput value={search} onChange={setSearch}/>
                <br/>
                <MyTable
                    loading={store.admin_feature.list_loader.getLoading()}
                    limit={limit}
                    offset={offset}
                    setLimit={setLimit}
                    setOffset={setOffset}
                    head={head}
                    rows_length={store.admin_feature.getListData().count}
                    body={<FeatureRows loading={store.admin_feature.list_loader.getLoading()}
                                       reloadRegionList={reloadList}
                                       rows={store.admin_feature.getListData().results}/>}
                    next_offset={store.admin_feature.getListData().next_offset}
                    previous_offset={store.admin_feature.getListData().previous_offset}
                />
            </>
        );
    } catch (e) {
        return <div>Загрузка из RegionTypesList...</div>
    }

};

export default observer(RegionTypesList);