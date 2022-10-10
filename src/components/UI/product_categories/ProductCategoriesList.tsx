import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../context";
import MyTable from "../@others/atoms/MyTable";
import {observer} from "mobx-react-lite";
import {useLocation, useSearchParams} from 'react-router-dom';
import MyBreadcrumbs from "../@others/atoms/MyBreadcrumbs";
import SearchInput from "../@others/atoms/SearchInput";
import ProductCategoriesRows from "./ProductCategoriesRows";
import {useTranslation} from "react-i18next";

const head = [
    {id: 1, title: 'ID', props: {align: 'center'}},
    {id: 2, title: 'Image', props: {align: 'center'}},
    {id: 3, title: 'Name2'},
    {id: 4, title: 'Status', props: {align: 'center'}},
    {id: 5, title: 'Actions', props: {align: 'center'}},
]

const ProductCategoriesList = () => {
    const {store} = useContext(Context);
    const location = useLocation();
    const {t} = useTranslation();

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
        console.log(parent)
        store.admin_category.get_all(limit, offset, parent, search, null).then(r => {
            console.log(r)
        })
    }, [parent, limit, offset, search]);


    const reloadRegionList = () => {
        store.admin_category.get_all(limit, offset, parent, search, null)
    }

    const [breadcrumbsLinks, setBreadcrumbsLinks] = useState<any[]>([]);
    useEffect(() => console.log(breadcrumbsLinks), [breadcrumbsLinks])


    const [newLinks, setNewLinks] = useState<any[]>([]);

    useEffect(() => {
        console.log(location.search)
        setOffset(0)
        store.admin_category.get_path(Number(searchParams.get('parent')))
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
                <MyBreadcrumbs page={'product_categories'} links={store.admin_category.getPathData()} base_location={'/product_categories/list'}
                               loading={store.admin_category.path_loader.getLoading()}/>
                <br/>
                <MyTable
                    loading={store.admin_category.list_loader.getLoading()}
                    limit={limit}
                    offset={offset}
                    setLimit={setLimit}
                    setOffset={setOffset}
                    head={head}
                    rows_length={store.admin_category.getListData().count}
                    body={<ProductCategoriesRows reloadRegionList={reloadRegionList} rows={store.admin_category.getListData().results}/>}
                    next_offset={store.admin_category.getListData().next_offset}
                    previous_offset={store.admin_category.getListData().previous_offset}
                />
            </>
        );
    } catch (e) {
        return <div>Загрузка из RegionList...</div>
    }

};

export default observer(ProductCategoriesList);