import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import styled from "styled-components";
import {observer} from "mobx-react-lite";
import {Dispatch, SetStateAction, useEffect} from "react";
import noDataImg from '../../../../assets/images/no-data.png'
import Typography from "@mui/material/Typography";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface IHead {
    id: number;
    props?: any;
    title: string;
}

type Props = {
    head: IHead[];
    body: React.ReactNode;
    rows_length: number;
    limit: number;
    offset: number;
    setLimit: Dispatch<SetStateAction<number>>;
    setOffset: Dispatch<SetStateAction<number>>;
    loading: boolean;
    next_offset: number;
    previous_offset: number;
}


function MyTable({
                     head,
                     body,
                     rows_length,
                     limit,
                     offset,
                     setLimit,
                     setOffset,
                     loading,
                     next_offset,
                     previous_offset
                 }: Props) {

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [page, setPage] = React.useState(0);
    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(newPage)
        setPage(newPage);
        if (newPage > page) {
            setOffset(next_offset)
        } else {
            setOffset(previous_offset)
        }
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        let rows_per_page = parseInt(event.target.value, 10);
        setLimit(rows_per_page);
        if (rows_per_page > rows_length) {
            setOffset(0)
        }
    };

    useEffect(() => {
        if (offset === 0) {
            setPage(0);
        }
    }, [offset])
    const {t} = useTranslation();

    if (loading) return <div>Загрузка из MyTable...</div>

    return (<Paper sx={{width: '100%', mb: 2,}} variant={'elevation'} elevation={0}>
            <TableContainer>
                <Table sx={{minWidth: 700}} size="small">
                    <StyledTableHead>
                        <TableRow>
                            {head.map((item: IHead) => <TableCell
                                // size={'medium'}
                                sx={{
                                    fontWeight: '500',
                                }}
                                key={item.id} {...item?.props}>{t(item.title)}</TableCell>)}
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {rows_length > 0 && body}
                    </TableBody>
                </Table>
                {rows_length <= 0 && <NoData>
                    <NoDataImg src={noDataImg} alt={noDataImg}/>

                    <Typography variant={'h3'}>
                        Empty
                    </Typography>
                </NoData>}
            </TableContainer>
            <TablePagination
                labelRowsPerPage={t("Number of rows")}
                rowsPerPageOptions={[1, 2, 15, 25, 35, 50]}
                component="div"
                count={rows_length}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default observer(MyTable);

const StyledTableHead = styled(TableHead)`
  * {
    background-color: #FBFBFD !important;
    color: #8D98AF !important;
  }
`;

const NoData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const NoDataImg = styled.img`
  width: 200px;
`;
