import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import {Tooltip} from "@mui/material";
import styled from "styled-components";
import {SearchNormal1} from "iconsax-react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import T from "./T";

type Props = {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
}

export default function SearchInput({value, onChange}: Props) {

    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(search)
        }, 500);
        return () => clearTimeout(timer);
    }, [search])

    return (
        <Root>
            <InputBase
                sx={{ml: 1, flex: 1, fontSize: '15px'}}
                placeholder={T("What are you looking for?")}
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Tooltip title={T("Enter a request")}>
                <StyledIconButton>
                    <SearchNormal1
                        size="18"
                        color="#7F92A0"
                    />
                </StyledIconButton>
            </Tooltip>
        </Root>
    );
}


const Root = styled.form`
  box-shadow: none;
  display: flex;
  width: 240px;
  align-items: center;
  border: 1px solid #F2F2F2;
  border-radius: 8px;

  transition-property: border-right-color, border-left-color, border-top-color, border-bottom-color;
  transition-duration: .3s;

  &:focus-within {
    border: 1px solid #1DA1F2;
  }

  //margin: 0 15px 0 10px;
`;

const StyledIconButton = styled.div`
  &:hover svg {
    color: #1DA1F2;
    transition: color 150ms;
  }

  color: rgba(0, 0, 0, 0.54);
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;