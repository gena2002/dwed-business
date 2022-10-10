import React, {useContext, useEffect} from 'react';
import styled from "styled-components";
import Alert from "@mui/material/Alert";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../context";
import Grow from '@mui/material/Grow';

const MyAlert = () => {
    const {store} = useContext(Context);
    useEffect(() => {
        const timer = setTimeout(() => {
            store.alert.setAlert(false, store.alert.getAlert().type, store.alert.getAlert().message)
        }, 5000);
        return () => clearTimeout(timer);
    }, [store.alert.getAlert().isShow]);

    return (
        <Root>
            <Grow
                in={store.alert.getAlert().isShow} {...(store.alert.getAlert().isShow ? {timeout: 500} : {timeout: 500})}>
                <Alert variant="filled" severity={
                    store.alert.getAlert().type === 'success' ? 'success' :
                        store.alert.getAlert().type === 'error' ? 'error' :
                            store.alert.getAlert().type === 'warning' ? 'warning' : 'info'
                } sx={{
                    color: 'white'
                }}>
                    {store.alert.getAlert().message}
                </Alert>
            </Grow>
        </Root>
    );
};

export default observer(MyAlert);

const Root = styled.div`
  position: fixed;
  top: 24px; // or bottom: 24px;
  left: 50%; // or left: 24px;
  transform: translateX(-50%);
  z-index: 9999;
`;
