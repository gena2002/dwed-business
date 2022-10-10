import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import MyTable from "../@others/atoms/MyTable";
import RegionsRows from "./RegionsRows";
import {observer} from "mobx-react-lite";
import {useLocation, useSearchParams} from 'react-router-dom';
import MyBreadcrumbs from "../@others/atoms/MyBreadcrumbs";
import SearchInput from "../@others/atoms/SearchInput";
import T from "../@others/atoms/T";

const head = [
    {id: 1, title: 'ID', props: {align: 'center'}},
    {id: 2, title: 'Name2'},
    {id: 3, title: 'Type', props: {align: 'left'}},
    {id: 4, title: 'Actions', props: {align: 'right'}},
]

const RegionList = () => {
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
        store.admin_region.get_all(limit, offset, parent, search, null).then(r => {
            console.log(r)
        })
    }, [parent, limit, offset, search]);


    const reloadRegionList = () => {
        store.admin_region.get_all(limit, offset, parent, search, null)
    }

    const [breadcrumbsLinks, setBreadcrumbsLinks] = useState<any[]>([]);
    useEffect(() => console.log(breadcrumbsLinks), [breadcrumbsLinks])


    const [newLinks, setNewLinks] = useState<any[]>([]);

    useEffect(() => {
        console.log(location.search)
        setOffset(0)
        store.admin_region.get_path(Number(searchParams.get('parent')))
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
                <MyBreadcrumbs page={`${T("Regions")}`} links={store.admin_region.getPathData()}
                               base_location={'/regions/list'}
                               loading={store.admin_region.path_loader.getLoading()}/>

                <MyTable
                    loading={store.admin_region.list_loader.getLoading()}
                    limit={limit}
                    offset={offset}
                    setLimit={setLimit}
                    setOffset={setOffset}
                    head={head}
                    rows_length={store.admin_region.getListData().count}
                    body={<RegionsRows reloadRegionList={reloadRegionList}
                                       rows={store.admin_region.getListData().results}/>}
                    next_offset={store.admin_region.getListData().next_offset}
                    previous_offset={store.admin_region.getListData().previous_offset}
                />
            </>
        );
    } catch (e) {
        return <div>Загрузка из RegionList...</div>
    }

};

export default observer(RegionList);