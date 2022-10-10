import React from 'react';
import styled from "styled-components";

type Props = {
    props?: any;
    children?: React.ReactNode;
}

const FlexRow = ({props, children}: Props) => {
    return (
        <Root {...props}>
            {children}
        </Root>
    );
};

export default FlexRow;

const Root = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  //align-items: center;
`;
