import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import {main_routers} from "../../../../routers/@others/main_rounters";
import {observer} from "mobx-react-lite";
import nav_logo from '../../../../assets/images/nav-logo.svg'
import styled from "styled-components";
import DrawerItems, {IDrawerParams} from "../../../../stores/@others/drawerItems";
import Header from "./Header";
import NavbarAccordions from "../atoms/NavbarAccordions";
import MyListItem from "../atoms/MyListItem";
import {RenderRoutes} from "../../../../gears";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../../../context";
import MyAlert from "../atoms/MyAlert";

const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}


function Main(props: Props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const {store} = useContext(Context);

    const [drawer_items, setDrawerItems] = useState(new DrawerItems().getItems(store));
    useEffect(() => {
        setDrawerItems(new DrawerItems().getItems(store))
        // alert(store.getLang())
    }, [store.getLang()])


    const drawer = (
        <div>
            <Toolbar>
                <Logo src={nav_logo} alt={'nav_logo'}/>
            </Toolbar>
            <List>
                {drawer_items.map((item: IDrawerParams) => (
                    item.uncover ? <NavbarAccordions key={item.id} item={item}/> :
                        <MyListItem key={item.id} item={item}/>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <MyAlert/>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar
                    elevation={0}
                    variant="outlined"
                    position="fixed"
                    sx={{
                        backgroundColor: '#F7F8FC',
                        width: {sm: `calc(100% - ${drawerWidth}px)`},
                        ml: {sm: `${drawerWidth}px`},
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {sm: 'none'}, color: 'text.primary'}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Header/>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        PaperProps={{
                            sx: {
                                backgroundColor: '#262626',
                            }
                        }}
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: {xs: 'block', sm: 'none'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        PaperProps={{
                            sx: {
                                backgroundColor: '#262626',
                            }
                        }}
                        variant="permanent"
                        sx={{
                            display: {xs: 'none', sm: 'block'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
                >
                    <Toolbar/>

                    <Root>
                        <RenderRoutes routers={main_routers(store)}/>
                    </Root>

                </Box>
            </Box>
        </>

)
    ;
}

export default observer(Main);

const Logo = styled.img`
  width: 189px;
  margin: 0 auto;
  pointer-events: none;
`;

const Root = styled.div`
  width: 100%;
  max-width: 1248px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;