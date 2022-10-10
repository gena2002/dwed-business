import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import ListPopup from "../atoms/ListPopup";
import {Context} from "../../../../context";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import SearchInput from "../atoms/SearchInput";

type Props = {
    current_parent: number;
    current_parent_name: string | null;
    setCurrentParent: Dispatch<SetStateAction<number>>;
    setCurrentParentName: Dispatch<SetStateAction<string | null>>;
}

const BaseFeaturePopup = ({current_parent, current_parent_name, setCurrentParent, setCurrentParentName}:Props) => {
    const {store} = useContext(Context);
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const [parent, setParent] = useState<number>(NaN);
    const [parent_name, setParentName] = useState<string | null>(null);
    const [limit, setLimit] = useState<number>(5); //limit for ParentsRowsPopup
    const [offset, setOffset] = useState<number>(0);
    const [search, setSearch] = useState<string>('');


    useEffect(() => {
        const _parent = searchParams.get('parent')

        if (_parent !== null) {
            setParent(Number(_parent) | 0)
        } else {
            setParent(0)
        }
    }, [searchParams]);

    useEffect(() => {
        store.base_feature.get_all(limit, offset, parent, search)
    }, [parent, limit, offset, search]);


    useEffect(() => {
        const _parent = Number(searchParams.get('parent'))
        if (_parent !== null) {
            if (_parent === 0) {
                setCurrentParent(NaN)
            } else {
                setCurrentParent(_parent)
            }
        } else {
            setCurrentParent(NaN)
        }

        const _name = searchParams.get('name')
        if (_name !== null) {
            setCurrentParentName(_name)
        } else {
            setCurrentParentName(null)
        }

    }, []);

    useEffect(() => {
        console.log('asd')
        store.base_feature.get_path(Number(searchParams.get('parent'))).then(r => console.log(r))
    }, [location.search])

    return (
        <>
            <ListPopup
                search={search}
                setSearch={setSearch}
                parent={{
                    id: parent,
                    name: parent_name,
                    set: setParent,
                    setName: setParentName,
                    breadcrumbsLinks: store.base_feature.getPathData(),
                    breadcrumbsLoading: store.base_feature.path_loader.getLoading(),
                    breadcrumbsPage: 'Base Feature'
                }}
                title={'Enter Base Feature Parent'}
                rows={store.base_feature.getListData().results}
                loading={store.base_feature.list_loader.getLoading()}
                current={current_parent}
                current_name={current_parent_name}
                setCurrent={setCurrentParent}
                setCurrentName={setCurrentParentName}
                offset={offset}
                setOffset={setOffset}
                next_offset={store.base_feature.getListData().next_offset}
                previous_offset={store.base_feature.getListData().previous_offset}
                count={store.base_feature.getListData().count}
            />
        </>
    );
};

export default observer(BaseFeaturePopup);