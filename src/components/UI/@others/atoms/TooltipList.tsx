import React from 'react';
import styled from "styled-components";

type TooltipListProps = {
    items: string[];
}

const TooltipList = ({items}: TooltipListProps) => {
    return (
        <Root>
            <Title>List</Title>
            {items.map((item, i)=> <p key={i}>{item}</p>)}
        </Root>
    );
};

export default TooltipList;

const Root = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  color: white;
`;

const Title = styled.div`
  color: #7F92A0;
  font-size: 12px;
`;