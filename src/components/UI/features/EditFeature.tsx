import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {observer} from "mobx-react-lite";

const EditFeature = () => {
    return (
        <>EditFeature</>
    );
};

export default observer(EditFeature);

const Root = styled.form`
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;