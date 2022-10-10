import * as React from 'react';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, {AccordionProps} from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {IDrawerParams} from "../../../../stores/@others/drawerItems";
import MyListItem from "./MyListItem";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {observer} from "mobx-react-lite";
import T from "./T";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
    padding: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({
    padding: 0,
    position: 'relative',
    '& .MuiAccordionSummary-expandIconWrapper': {
        color: '#7F92A0',
        position: 'absolute',
        top: '50%',
        right: '16px',
        transform: 'translate(0, -50%) rotate(90deg)'
    },
    '&:hover .MuiAccordionSummary-expandIconWrapper': {
        color: '#ffffff',
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: ' translate(0, -50%) rotate(-90deg)',
    },
    '& .MuiAccordionSummary-content': {
        margin: 0,
        padding: 0,
    },

}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
    padding: 0,
}));

type Props = {
    item: IDrawerParams;
}


function NavbarAccordions({item}: Props) {
    const location = useLocation();
    const [expanded, setExpanded] = React.useState<boolean>(false);

    useEffect(() => {
        if (item?.children?.some(r => {
            return r?.location === `/${location.pathname.split('/')[1]}`;
        })) {
            setExpanded(true)
        } else {
            setExpanded(false)
        }
    }, [item])

    const handleChange = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setExpanded(!expanded);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <MyListItem item={item}/>
            </AccordionSummary>
            <AccordionDetails>
                {item.children?.map((item: IDrawerParams) => (
                    item.uncover ? <NavbarAccordions key={item.id} item={item}/> :
                        <MyListItem key={item.id} item={item}/>
                ))}
            </AccordionDetails>
        </Accordion>
    );
}

export default observer(NavbarAccordions);