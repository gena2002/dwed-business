import React, {useContext, useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import {useLocation, useSearchParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../context";
import {MyRow} from "./MyRow";
import {Title24} from "./Title24";
import NavigateButton from "./NavigateButton";
import T from "./T";

type Props = {
    title: string,
    add_title: string,
    add_url: string,
}

const Top = ({title, add_title, add_url}: Props) => {
    const {store} = useContext(Context);
    const location = useLocation();

    const [parent, setParent] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const _parent = searchParams.get('parent')
        if (_parent !== null) {
            setParent(_parent)
        } else {
            setParent(null)
        }

        const _name = searchParams.get('name')
        if (_name !== null) {
            setName(_name)
        } else {
            setName(null)
        }

    }, [searchParams]);

    useEffect(() => {
        store.setPreviousPage(location.pathname + location.search)
    }, [location.pathname, location.search])

    return (
        <MyRow>
            <Title24>
                {T(title)}
            </Title24>
            <NavigateButton
                to={`${parent !== null && name !== null ? `${add_url}?parent=${parent}&name=${name}` : add_url}`}>
                <Button variant="contained" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    {T(add_title)}
                </Button>
            </NavigateButton>
        </MyRow>
    );
};

export default observer(Top);