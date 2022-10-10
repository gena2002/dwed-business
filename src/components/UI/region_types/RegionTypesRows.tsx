import {useNavigate} from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import React, {useContext, useState} from "react";
import styled from "styled-components";
import TableRow from "@mui/material/TableRow";
import {observer} from "mobx-react-lite";
import EditRow from "../@others/atoms/EditRow";
import {Context} from "../../../context";
import {HiddenTitle} from "../@others/atoms/HiddenTitle";

type Props = {
    rows: any[];
    reloadRegionList: () => void;
    loading: boolean;
}

function RegionTypesRows({rows, reloadRegionList, loading}: Props) {
    const navigate = useNavigate();
    const {store} = useContext(Context);


    if (loading) return <>Загрузка из RegionTypesRows...</>

    return (<>
            {rows.map((row) => (
                <StyledTableRow key={row.id} style={{
                    cursor: 'default'
                }} onClick={() => {
                    navigate(`/region_types/list/${row.id}`)
                }}>
                    <TableCell padding="checkbox" align="center">
                        <HiddenTitle variant={'body2'}>
                            {row.id}
                        </HiddenTitle>
                    </TableCell>
                    <TableCell padding="checkbox">
                        <HiddenTitle variant={'body2'}>
                            {row.name}
                        </HiddenTitle>
                    </TableCell>
                    <TableCell align="right">
                        <EditRow edit_link={`/region_types/list/${row.id}`} onDelete={() => {
                            store.admin_region_type.delete(row.id).then(() => {
                                store.alert.setAlert(true, 'success', 'Region Type is deleted success');
                                reloadRegionList()
                            })
                        }}/>
                    </TableCell>

                </StyledTableRow>
            ))}
        </>
    )
}

export default observer(RegionTypesRows);

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: #F7F8FC !important;
  }
`;