import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {INameId} from "../../../../models/@others/INameId";

type Props = {
    links: INameId[],
    base_location: string;
    loading: boolean;
    page: string;
}

const MyBreadcrumbs = ({links, base_location, loading, page}: Props) => {
    const navigate = useNavigate();

    // try {
    return (<div style={{ marginBottom: '5px'}}>
            <Breadcrumbs maxItems={3}
                         itemsBeforeCollapse={1}
                         itemsAfterCollapse={2}
                         aria-label="breadcrumb" sx={{
                fontSize: '12px'
            }}>

                {links.length > 0 &&
                    <Link
                        underline="hover"
                        color="inherit"
                        onClick={() => navigate(`${base_location}`)}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        {page}
                    </Link>


                }
                {links.length > 0 && links.map((link, index) =>
                        index !== links.length - 1 && <Link
                            key={link.id}
                            underline="hover"
                            color="inherit"
                            sx={{
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate(`${base_location}?parent=${link.id}&name=${link.name}`)}
                        >
                            {link.name}
                        </Link>
                )}
                <Typography color="text.primary" sx={{
                    fontSize: '12px',
                }}>
                    {
                        links.length > 0 ?
                            links[links.length - 1].name : page
                    }
                </Typography>
            </Breadcrumbs>
            {/*<br/>*/}
        </div>
    );
    // } catch (e) {
    //     return <></>
    // }

};

export default observer(MyBreadcrumbs);