import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";
import {Edit2, Trash} from "iconsax-react";
import Popup from "./Popup";
import Button from "@mui/material/Button";
import FlexRow from "./FlexRow";
import DialogTitle from '@mui/material/DialogTitle';
import {observer} from "mobx-react-lite";
import T from "./T";
import {useTranslation} from "react-i18next";

type Props = {
    onDelete: () => void;
    edit_link: string;
}

const EditRow = ({onDelete, edit_link}: Props) => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    };
    const [openDeletePopup, setOpenDeletePopup] = useState(false);
    return (
        <>
            <IconButton aria-label="more" style={{
                cursor: 'pointer',
                padding: '8px'
            }} onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={(e) => {
                    e.stopPropagation();
                    navigate(edit_link)
                }} sx={{
                    display: 'flex',
                    gap: '10px',
                }}>
                    <Edit2
                        size="24"
                        color="#7F92A0"
                    />
                    {t('Edit')}
                </MenuItem>
                <MenuItem onClick={(e) => {
                    e.stopPropagation();
                    setOpenDeletePopup(true);
                }} sx={{
                    display: 'flex',
                    gap: '10px',
                }}>
                    <Trash
                        size="24"
                        color="#FF5A5F"
                    />
                    {t('Delete')}
                </MenuItem>
            </Menu>

            <Popup open={openDeletePopup} onClose={(e: any) => {
                e.stopPropagation();
                setOpenDeletePopup(false)
            }}>

                <DialogTitle sx={{
                    textAlign: 'center'
                }} id="alert-dialog-title" onClick={(e: any) => e.stopPropagation()}>
                    Do you really want to delete?
                </DialogTitle>
                <div style={{
                    padding: '0 24px 24px 24px'
                }} onClick={(e: any) => e.stopPropagation()}>
                    <FlexRow justifyContent={'flex-end'}>
                        <Button sx={{
                            minWidth: '220px',
                            alignSelf: 'flex-end'
                        }} variant={'text'} color={'error'} onClick={(e: any) => {
                            e.stopPropagation();
                            setOpenDeletePopup(false)
                            handleClose(e)
                        }}>Cancel</Button>
                        <Button variant="contained" sx={{
                            minWidth: '220px',
                            alignSelf: 'flex-end'
                        }} onClick={(e: any) => {
                            e.stopPropagation();
                            onDelete()
                        }}>OK</Button>
                    </FlexRow>
                </div>
            </Popup>
        </>
    );
};

export default observer(EditRow);