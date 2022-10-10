import * as React from 'react';
import styled from "styled-components";
import {observer} from "mobx-react-lite";
import {header} from "../../../templates/@others/header_templates";
import {components} from "../../../../gears/public/components";

function Header() {
    return (
        <Root>
            {components.get(header)}
        </Root>
    );
}

export default observer(Header);

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 20px;
`;
