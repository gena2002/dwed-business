import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import MyTable from "../@others/atoms/MyTable";
import {observer} from "mobx-react-lite";
import {useLocation, useSearchParams} from 'react-router-dom';
import MyBreadcrumbs from "../@others/atoms/MyBreadcrumbs";
import SearchInput from "../@others/atoms/SearchInput";
import T from "../@others/atoms/T";
import BaseFeatureRows from "./BaseFeatureRows";

const head = [
    {id: 1, title: 'ID', props: {align: 'center'}},
    {id: 2, title: 'Name2'},
    {id: 3, title: 'Actions', props: {align: 'right'}},
]

const BaseFeatureList = () => {
    const {store} = useContext(Context);
    const location = useLocation();

    const [limit, setLimit] = useState<number>(15);
    const [offset, setOffset] = useState<number>(0);

    const [search, setSearch] = useState<string>('');
    const [parent, setParent] = useState<number>(0);
    const [parent_name, setParentName] = useState<string | null>(null);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const _parent = searchParams.get('parent')
        const _name = searchParams.get('name')

        if (_parent !== null) {
            setParent(Number(_parent))
            if (_name !== null) {
                setParentName(_name)
            } else {
                setParentName(null)
            }
        } else {
            setParent(0)
        }


    }, [searchParams]);

    useEffect(() => {
        store.base_feature.get_all(limit, offset, parent, search).then(r => {
            console.log(r)
        })
    }, [parent, limit, offset, search]);


    const reloadRegionList = () => {
        store.base_feature.get_all(limit, offset, parent, search)
    }

    const [breadcrumbsLinks, setBreadcrumbsLinks] = useState<any[]>([]);
    useEffect(() => console.log(breadcrumbsLinks), [breadcrumbsLinks])


    const [newLinks, setNewLinks] = useState<any[]>([]);

    useEffect(() => {
        console.log(location.search)
        setOffset(0)
        store.base_feature.get_path(Number(searchParams.get('parent')))
    }, [location.search])

    useEffect(() => {
        console.log(newLinks)
    }, [newLinks])

    useEffect(() => {
        setOffset(0)
    }, [search])

    try {

        return (<>
                <SearchInput value={search} onChange={setSearch}/>
                <br/>
                <MyBreadcrumbs page={`${T("base_feature")}`} links={store.base_feature.getPathData()}
                               base_location={'/base_feature/list'}
                               loading={store.base_feature.path_loader.getLoading()}/>

                <MyTable
                    loading={store.base_feature.list_loader.getLoading()}
                    limit={limit}
                    offset={offset}
                    setLimit={setLimit}
                    setOffset={setOffset}
                    head={head}
                    rows_length={store.base_feature.getListData().count}
                    body={<BaseFeatureRows reloadRegionList={reloadRegionList}
                                           rows={store.base_feature.getListData().results}/>}
                    next_offset={store.base_feature.getListData().next_offset}
                    previous_offset={store.base_feature.getListData().previous_offset}
                />
            </>
        );
    } catch (e) {
        return <div>Загрузка из RegionList...</div>
    }

};

export default observer(BaseFeatureList);