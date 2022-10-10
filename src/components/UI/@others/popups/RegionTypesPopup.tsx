import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {Context} from "../../../../context";
import {observer} from "mobx-react-lite";
import ListPopup from "../atoms/ListPopup";

type Props = {
    type: number;
    setType: Dispatch<SetStateAction<number>>;
    type_name: string | null;
    setTypeName: Dispatch<SetStateAction<string | null>>;
}

const RegionTypesPopup = ({type, setType, type_name, setTypeName}: Props) => {
    const {store} = useContext(Context);

    const [limit, setLimit] = useState<number>(5);
    const [offset, setOffset] = useState<number>(0);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        store.admin_region_type.get_all(limit, offset, search)
    }, [limit, offset, search]);

    return (
        <ListPopup
            search={search}
            setSearch={setSearch}
            title={'Enter Region Type'}
            rows={store.admin_region_type.getListData().results}
            loading={store.admin_region_type.list_loader.getLoading()}
            offset={offset}
            setOffset={setOffset}
            next_offset={store.admin_region_type.getListData().next_offset}
            previous_offset={store.admin_region_type.getListData().previous_offset}
            count={Number(store.admin_region_type.getListData().count)}
            current={type}
            setCurrent={setType}
            current_name={type_name}
            setCurrentName={setTypeName}
        />
    );

};

export default observer(RegionTypesPopup);
