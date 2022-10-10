import {useNavigate} from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import React, {useContext, useState} from "react";
import styled from "styled-components";
import TableRow from "@mui/material/TableRow";
import {observer} from "mobx-react-lite";
import EditRow from "../@others/atoms/EditRow";
import {Context} from "../../../context";
import {IOfficialField} from "../../../models/pms/IOfficialField";
import {HiddenTitle} from "../@others/atoms/HiddenTitle";

type Props = {
    rows: IOfficialField[];
    reloadRegionList: () => void;
    loading: boolean;
}

function OfficialFieldsRows({rows, reloadRegionList, loading}: Props) {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    if (loading) return <>Загрузка из OfficialFieldsRows...</>

    console.log(rows[0].is_required)

    return (<>
            {rows.map((row) => (
                <StyledTableRow key={row.id} style={{
                    cursor: 'default'
                }} onClick={() => {
                    navigate(`/official_fields/list/${row.id}`)
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
                    <TableCell padding="checkbox">
                        <HiddenTitle variant={'body2'}>
                            {row.country?.name || null}
                        </HiddenTitle>
                    </TableCell>
                    <TableCell padding="checkbox">
                        <HiddenTitle variant={'body2'}>
                            {row?.is_required.toString() || null}
                        </HiddenTitle>
                    </TableCell>
                    <TableCell align="right">
                        <EditRow edit_link={`/official_fields/list/${row.id}`} onDelete={() => {
                            store.admin_official_field.delete(row.id).then(() => {
                                store.alert.setAlert(true, 'success', 'Official Field is deleted success');
                                reloadRegionList()
                            })
                        }}/>
                    </TableCell>

                </StyledTableRow>
            ))}
        </>
    )

}

export default observer(OfficialFieldsRows);

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: #F7F8FC !important;
  }
`;