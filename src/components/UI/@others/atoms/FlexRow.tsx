import React from 'react';
import styled from "styled-components";

type Props = {
    props?: any;
    children?: React.ReactNode;
    justifyContent?: string;
}

const FlexRow = ({props, children, justifyContent}: Props) => {
    return (
        <Root {...props} justifyContent={justifyContent}>
            {children}
        </Root>
    );
};

export default FlexRow;

type RootProps = {
    justifyContent: string;
}
const Root = styled.div<RootProps>`
  display: flex;
  gap: 24px;
  justify-content: ${props => props.justifyContent};
  align-items: center;
  flex-direction: row;
`;
