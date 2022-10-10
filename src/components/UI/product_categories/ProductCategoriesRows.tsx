import {useNavigate} from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import React, {useContext, useState} from "react";
import styled from "styled-components";
import TableRow from "@mui/material/TableRow";
import {observer} from "mobx-react-lite";
import EditRow from "../@others/atoms/EditRow";
import {Context} from "../../../context";
import {IAdminCategory} from "../../../models/pms/admin_category/IAdminCategory";
import {HiddenTitle} from "../@others/atoms/HiddenTitle";
import {useTranslation} from "react-i18next";
import Chip from '@mui/material/Chip';

type Props = {
    rows: IAdminCategory[];
    reloadRegionList: () => void;
}

function ProductCategoriesRows({rows, reloadRegionList}: Props) {
    const navigate = useNavigate();
    const {store} = useContext(Context);

    function showChild(id: number, name: string, is_parent: boolean) {
        if (is_parent) {
            navigate(`/product_categories/list?parent=${id}&name=${name}`)
        } else {
            navigate(`/product_categories/list/${id}`)
        }
    }

    const {t} = useTranslation();

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
                    <TableCell padding="checkbox" align="center">
                        <Image style={{backgroundImage: `url(${row.image})`}}/>
                    </TableCell>
                    <TableCell size={'medium'}>
                        <HiddenTitle variant={'body2'}>
                            {row.name}
                        </HiddenTitle>
                    </TableCell>
                    <TableCell padding="checkbox" align="center">
                        {row.status === 1 ?
                            <Chip label={t("Active")} variant="outlined" size={'small'} color={'success'}
                                  style={{margin: '0 auto'}}/> :
                            <Chip size={'small'} label={t("Not Active")} variant="outlined" color={'warning'}
                                  style={{margin: '0 auto'}}/>}

                    </TableCell>
                    <TableCell padding="checkbox" align="center">
                        <EditRow edit_link={`/product_categories/list/${row.id}`} onDelete={() => {
                            store.admin_category.delete(row.id).then(() => {
                                store.alert.setAlert(true, 'success', 'Product Categories is deleted success');
                                reloadRegionList()
                            })
                        }}/>
                    </TableCell>

                </StyledTableRow>
            ))}
        </>
    )


}


export default observer(ProductCategoriesRows);

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: #F7F8FC !important;
  }
`;

const Image = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  pointer-events: none;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: 0 auto;
  background-color: #ccc;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.25);
`;