import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../context";
import ListPopup from "../atoms/ListPopup";
import {useTranslation} from "react-i18next";

type Props = {
    current_parent: number;
    current_parent_name: string | null;
    setCurrentParent: Dispatch<SetStateAction<number>>;
    setCurrentParentName: Dispatch<SetStateAction<string | null>>;
}

const ProductCategoryPopup = ({current_parent, current_parent_name, setCurrentParent, setCurrentParentName}: Props) => {

    const {store} = useContext(Context);
    const location = useLocation();
    const {t} = useTranslation();

    const [parent, setParent] = useState<number>(NaN);
    const [parent_name, setParentName] = useState<string | null>(null);
    const [limit, setLimit] = useState<number>(5); //limit for ParentsRowsPopup
    const [offset, setOffset] = useState<number>(0);
    const [search, setSearch] = useState<string>('');

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const _parent = searchParams.get('parent')
        if (_parent !== null) {
            setParent(Number(_parent) | 0)
        } else {
            setParent(0)
        }
    }, [searchParams]);

    useEffect(() => {
        store.admin_category.get_all(limit, offset, parent, search, null)
    }, [parent, limit, offset, search]);

    useEffect(() => {
        const _parent = Number(searchParams.get('parent'))
        if (isNaN(current_parent) || current_parent === undefined) {
            if (_parent !== null) {
                if (_parent === 0) {
                    setCurrentParent(NaN)
                } else {
                    setCurrentParent(_parent)
                }
            } else {
                setCurrentParent(NaN)
            }
        }
        if (current_parent_name === undefined || current_parent_name === null) {
            const _name = searchParams.get('name')
            if (_name !== null) {
                setCurrentParentName(_name)
            } else {
                setCurrentParentName(null)
            }
        }
    }, []);

    useEffect(() => {
        const _parent = searchParams.get('parent')
        store.admin_category.get_path(Number(_parent) | 0)
    }, [location.search])

    return (<>
            <ListPopup
                search={search}
                setSearch={setSearch}
                parent={{
                    id: parent,
                    name: parent_name,
                    set: setParent,
                    setName: setParentName,
                    breadcrumbsLinks: store.admin_category.getPathData(),
                    breadcrumbsLoading: store.admin_category.path_loader.getLoading(),
                    breadcrumbsPage: 'product_category'
                }}
                title={'Enter Product Category'}
                rows={store.admin_category.getListData().results}
                loading={store.admin_category.list_loader.getLoading()}
                current={current_parent}
                current_name={current_parent_name}
                setCurrent={setCurrentParent}
                setCurrentName={setCurrentParentName}
                offset={offset}
                setOffset={setOffset}
                next_offset={store.admin_category.getListData().next_offset}
                previous_offset={store.admin_category.getListData().previous_offset}
                count={Number(store.admin_category.getListData().count)}

            />
        </>

    );
};

export default observer(ProductCategoryPopup);

