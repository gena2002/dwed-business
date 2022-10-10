import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import styled from "styled-components";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {observer} from "mobx-react-lite";
import Popup from "./Popup";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import MyBreadcrumbs from "./MyBreadcrumbs";
import {INameId} from "../../../../models/@others/INameId";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import SearchInput from "./SearchInput";

// if is_parent === true
type ParentProps = {
    id: number;
    name: string | null;
    set: Dispatch<SetStateAction<number>>
    setName: Dispatch<SetStateAction<string | null>>
    breadcrumbsPage: string;
    breadcrumbsLinks: INameId[];
    breadcrumbsLoading: boolean;
}

// if is_multiple === true
type MultipleProps = {
    setMultipleValues: Dispatch<SetStateAction<number[]>>;
}

interface Props {
    multiple?: MultipleProps;
    parent?: ParentProps;
    rows: any[];
    loading: boolean;
    current: number;
    current_name: string | null;
    setCurrent: Dispatch<SetStateAction<number>>;
    setCurrentName: Dispatch<SetStateAction<string | null>>;
    offset: number;
    setOffset: Dispatch<SetStateAction<number>>;
    previous_offset: number;
    next_offset: number;
    count: number;
    title: string;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}


const ListPopup = ({
                       multiple,
                       parent,
                       rows,
                       loading,
                       current,
                       current_name,
                       setCurrent,
                       setCurrentName,
                       offset,
                       setOffset,
                       previous_offset,
                       next_offset,
                       count,
                       title,
                       search,
                       setSearch
                   }: Props) => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const [page, setPage] = React.useState(1);

    useEffect(() => {
        if (parent) {
            const _parent = searchParams.get('parent')
            if (_parent !== null) {
                parent.set(Number(_parent))
            } else {
                parent.set(0)
            }
            const _name = searchParams.get('name')
            if (_name !== null) {
                parent.setName(_name)
            } else {
                parent.setName(null)
            }
        }

    }, [searchParams]);


    const [checked, setChecked] = React.useState(current);

    useEffect(() => {
        setChecked(current)
    }, [current])

    const handleClick = (id: number | null, name: string | null, is_parent: boolean) => {
        if (is_parent) {
            showChild(id, name)
        } else {
            if (multiple) {
                handleToggle(id)
            } else {
                handleCheck(id, name)
            }
        }
    }

    const handleCheck = (id: number | null, name: string | null) => {
        if (checked !== id) {
            setChecked(Number(id))
            setCurrent(Number(id))
            setCurrentName(name)
        } else {
            setChecked(Number(parent))
            setCurrent(NaN)
            setCurrentName(null)
        }
    }

    function showChild(id: number | null, name: string | null) {
        navigate(`${location.pathname}?parent=${id}&name=${name}`)
    }

    const [open, setOpen] = useState(false);

    const [multiple_checked, setMultipleChecked] = React.useState<number []>([]);

    const handleToggle = (id: number | null) => {
        if (id !== null) {
            const currentIndex = multiple_checked.indexOf(id);
            const newChecked = [...multiple_checked];

            if (currentIndex === -1) {
                newChecked.push(id);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            setMultipleChecked(newChecked);
        }
    };

    useEffect(() => {
        if (multiple) {
            multiple.setMultipleValues(multiple_checked);
        }
    }, [multiple_checked])

    try {
        return (
            <>
                <Button style={{maxWidth: '235px'}} onClick={() => {
                    if (parent) navigate(location.pathname)
                    setOpen(true)
                }} variant="outlined">
                    {multiple ? title :
                        current_name === null
                        || current_name === 'null'
                        || current_name === undefined ? title : current_name}
                </Button>

                <Popup open={open} onClose={() => {
                    if (parent) navigate(location.pathname)
                    setOpen(false)
                }}>
                    <Root>
                        <div style={{width: '100%', padding: '0 8px', marginBottom: '8px'}}>
                            <SearchInput value={search} onChange={setSearch}/>
                        </div>
                        {parent &&
                            <div style={{width: '100%', padding: '0 8px',}}>
                                <MyBreadcrumbs page={parent.breadcrumbsPage} links={parent.breadcrumbsLinks}
                                               base_location={location.pathname}
                                               loading={parent.breadcrumbsLoading}/>
                            </div>}

                        <List
                            sx={{
                                bgcolor: 'background.paper',
                                // position: 'relative',
                                width: '100%',
                                maxHeight: 250,
                                minHeight: 250,
                                padding: '0',
                                marginBottom: '8px',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'rgba(0, 0, 0, 0.54) rgba(0, 0, 0, 0)',
                                '&::-webkit-scrollbar': {
                                    width: '0.36vw'
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'rgba(0, 0, 0, 0.0)',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.54)',
                                    border: 'none',
                                }
                            }}
                        >
                            {
                                loading ?
                                    <Loader>
                                        <CircularProgress color="primary"/>
                                    </Loader> : rows.length > 0 ?
                                        rows.map((row) => {
                                            const labelId = `checkbox-list-secondary-label-${row.id}`;
                                            return (
                                                <ListItem
                                                    key={row.id}
                                                    secondaryAction={
                                                        <Checkbox
                                                            edge="end"
                                                            tabIndex={multiple ? -1 : 0}
                                                            onChange={() => multiple ? handleToggle(row.id) : handleCheck(row.id, row.name)}
                                                            checked={multiple ? multiple_checked.indexOf(row.id) !== -1 : checked === row.id}
                                                            inputProps={{'aria-labelledby': labelId}}
                                                        />
                                                    }
                                                    disablePadding
                                                >
                                                    <ListItemButton onClick={() => {
                                                        handleClick(row.id, row.name, row.is_parent)
                                                    }} sx={{
                                                        color: '#7F92A0',
                                                        '*': {color: '#7F92A0',},
                                                        "&:hover": {
                                                            backgroundColor: "rgba(127,146,160,0.08)",
                                                            color: "#262626",
                                                            "*": {
                                                                color: "#262626"
                                                            }
                                                        },
                                                        "&.Mui-selected": {
                                                            backgroundColor: "rgba(127,146,160,0.08)",
                                                            color: "#262626",
                                                            "*": {
                                                                color: "#262626",
                                                                // backgroundColor: "rgba(127,146,160,0.08)",
                                                            }
                                                        },
                                                        "&.Mui-selected:hover": {
                                                            backgroundColor: "rgba(127,146,160,0.08)",
                                                            color: "#262626",
                                                            "*": {
                                                                color: "#262626"
                                                            }
                                                        }
                                                    }}>
                                                        <ListItemText disableTypography id={labelId} primary={
                                                            <Typography variant="subtitle2">{row.name}</Typography>
                                                        }/>
                                                    </ListItemButton>
                                                </ListItem>
                                            );

                                        }) : <Loader>
                                            <p>There are no Parents yet.</p>
                                        </Loader>
                            }
                        </List>

                        <Pagination page={page} onChange={(e, newPage) => {
                            setPage(newPage);
                            if (newPage > page) {
                                setOffset(next_offset)
                            } else if (newPage === page) {
                                setOffset(offset)
                            } else {
                                setOffset(previous_offset)
                            }
                        }} count={isNaN(count) ? 0 : Math.ceil(count / 5)}/>
                    </Root>
                </Popup>

            </>
        );
    } catch (e) {
        console.log(e)
        return <div>Error while loading</div>
    }

};

export default observer(ListPopup);

const Root = styled.div`
  margin: 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 360px;
  width: 90vw;
  padding: 8px 0;
`;

const Loader = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
