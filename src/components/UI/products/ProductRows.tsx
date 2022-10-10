import {useNavigate} from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import React, {useContext, useState} from "react";
import styled from "styled-components";
import TableRow from "@mui/material/TableRow";
import {observer} from "mobx-react-lite";
import EditRow from "../@others/atoms/EditRow";
import {Context} from "../../../context";
import {HiddenTitle} from "../@others/atoms/HiddenTitle";
import {IProduct} from "../../../models/pms/admin_product/IProduct";
import {IManufacturer} from "../../../models/pms/admin_manufacturer/IManufacturer";
import {INameId} from "../../../models/@others/INameId";

type Props = {
    rows: IProduct[];
    reloadRegionList: () => void;
}

function ProductRows({rows, reloadRegionList}: Props) {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    return (<>
            {rows.map((row) => (
                <StyledTableRow key={row.id} style={{
                    cursor: 'default'
                }} onClick={() => {
                    navigate(`/products/list/${row.id}`)
                }}>
                    <TableCell padding="checkbox" align="center">
                        <HiddenTitle variant={'body2'}>
                            {row.id}
                        </HiddenTitle>
                    </TableCell>
                    {/*<TableCell padding="checkbox">*/}
                    {/*    <HiddenTitle variant={'body2'}>*/}
                    {/*        {row.code}*/}
                    {/*    </HiddenTitle>*/}
                    {/*</TableCell>*/}
                    <TableCell padding="checkbox">
                        <HiddenTitle variant={'body2'}>
                            {row.name}
                        </HiddenTitle>
                    </TableCell>

                    <TableCell padding="checkbox">
                        <HiddenTitle variant={'body2'}>
                            {row.unit}
                        </HiddenTitle>
                    </TableCell>

                    <TableCell padding="checkbox">
                        <HiddenTitle variant={'body2'}>
                            {row.status}
                        </HiddenTitle>
                    </TableCell>
                    <TableCell padding="checkbox">
                        <HiddenTitle variant={'body2'}>
                            {row.manufacturer.name}
                        </HiddenTitle>
                    </TableCell>
                    <TableCell padding="checkbox">
                        <HiddenTitle variant={'body2'}>
                            {row.type.name}
                        </HiddenTitle>
                    </TableCell>

                    <TableCell padding="checkbox">
                        <HiddenTitle variant={'body2'}>
                            {row.category.name}
                        </HiddenTitle>
                    </TableCell>

                    {/*<TableCell padding="checkbox">*/}
                    {/*    <HiddenTitle variant={'body2'}>*/}

                    {/*        {row.create_date.split('T')[0]}*/}
                    {/*    </HiddenTitle>*/}
                    {/*</TableCell>*/}

                    {/*<TableCell padding="checkbox">*/}
                    {/*    <HiddenTitle variant={'body2'}>*/}
                    {/*        {row.update_date.split('T')[0]}*/}
                    {/*    </HiddenTitle>*/}
                    {/*</TableCell>*/}


                    <TableCell align="right">
                        <EditRow edit_link={`/products/list/${row.id}`} onDelete={() => {
                            store.admin_product.delete(row.id).then(() => {
                                store.alert.setAlert(true, 'success', 'Product is deleted success');
                                reloadRegionList()
                            })
                        }}/>
                    </TableCell>

                </StyledTableRow>
            ))}
        </>
    )

}


export default observer(ProductRows);

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: #F7F8FC !important;
  }
`;
