import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import ListPopup from "../atoms/ListPopup";
import {Context} from "../../../../context";
import {observer} from "mobx-react-lite";

type Props = {
    manufacturer: number;
    setManufacturer: Dispatch<SetStateAction<number>>;
    manufacturer_name: string | null;
    setManufacturerName: Dispatch<SetStateAction<string | null>>;
}


const ManufacturerPopup = ({manufacturer, setManufacturer, manufacturer_name, setManufacturerName}: Props) => {
    const {store} = useContext(Context);

    const [limit, setLimit] = useState<number>(5);
    const [offset, setOffset] = useState<number>(0);
    const [search, setSearch] = useState<string>('');
    const [org, setOrg] = useState<string>('');

    useEffect(() => {
        store.admin_manufacturer.get_all(limit, offset, search, null).then(r => console.log(r))
    }, [limit, offset, search]);

    return (
        <ListPopup
            search={search}
            setSearch={setSearch}
            title={'Enter Manufacturer'}
            rows={store.admin_manufacturer.getListData().results}
            loading={store.admin_manufacturer.list_loader.getLoading()}
            offset={offset}
            setOffset={setOffset}
            next_offset={store.admin_manufacturer.getListData().next_offset}
            previous_offset={store.admin_manufacturer.getListData().previous_offset}
            count={Number(store.admin_manufacturer.getListData().count)}
            current={manufacturer}
            setCurrent={setManufacturer}
            current_name={manufacturer_name}
            setCurrentName={setManufacturerName}
        />
    );
};

export default observer(ManufacturerPopup);