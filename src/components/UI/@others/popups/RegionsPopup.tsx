import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import ListPopup from "../atoms/ListPopup";
import {useLocation, useSearchParams} from "react-router-dom";
import {Context} from "../../../../context";
import {observer} from "mobx-react-lite";

type Props = {
    current_parent: number;
    current_parent_name: string | null;
    setCurrentParent: Dispatch<SetStateAction<number>>;
    setCurrentParentName: Dispatch<SetStateAction<string | null>>;
}

const RegionsPopup = ({current_parent, current_parent_name, setCurrentParent, setCurrentParentName}:Props) => {
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
        store.admin_region.get_all(limit, offset, parent, search, null)
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
        store.admin_region.get_path(Number(searchParams.get('parent'))).then(r => console.log(r))
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
                    breadcrumbsLinks: store.admin_region.getPathData(),
                    breadcrumbsLoading: store.admin_region.path_loader.getLoading(),
                    breadcrumbsPage: 'regions'
                }}
                title={'Enter Region Parent'}
                rows={store.admin_region.getListData().results}
                loading={store.admin_region.list_loader.getLoading()}
                current={current_parent}
                current_name={current_parent_name}
                setCurrent={setCurrentParent}
                setCurrentName={setCurrentParentName}
                offset={offset}
                setOffset={setOffset}
                next_offset={store.admin_region.getListData().next_offset}
                previous_offset={store.admin_region.getListData().previous_offset}
                count={store.admin_region.getListData().count}
            />
        </>
    );
};

export default observer(RegionsPopup);