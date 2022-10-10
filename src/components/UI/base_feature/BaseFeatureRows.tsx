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
}

function BaseFeatureRows({rows, reloadRegionList}: Props) {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    function showChild(id: number, name: string, is_parent: boolean) {
        if (is_parent) {
            navigate(`/base_feature/list?parent=${id}&name=${name}`)
        } else {
            navigate(`/base_feature/list/${id}`)
        }
    }

    return (<>
            {rows.map((row) => (
                <StyledTableRow key={row.id} style={{
                    cursor: 'default'
                }} onClick={() => {
                    showChild(row.id, row.name, row.is_parent)
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
                        <EditRow edit_link={`/base_feature/list/${row.id}`} onDelete={() => {
                            store.base_feature.delete(row.id).then(() => {
                                store.alert.setAlert(true, 'success', 'Base Feature is deleted success');
                                reloadRegionList()
                            })
                        }}/>
                    </TableCell>

                </StyledTableRow>
            ))}
        </>
    )


}


export default observer(BaseFeatureRows);

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: #F7F8FC !important;
  }
`;
