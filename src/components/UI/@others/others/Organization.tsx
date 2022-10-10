import * as React from 'react';
import styled from "styled-components";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { Alert } from '@mui/lab';
import {Title24} from "../atoms/Title24";

const Organization = () => {
    return (
        <Root>
            <Blocks>
                <Block1>
                    <Avatar sx={{width: 80, height: 80, margin: '0 auto'}}></Avatar>
                </Block1>
                <Block2>
                    <Block3>
                        <Title24>
                            Общая информация
                        </Title24>
                    </Block3>
                    <Block4>
                        <List
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                padding: 0,
                                gap: 5,
                            }}
                        >
                            <div style={{minWidth: 320}}>
                                <ListItem>
                                    <ListItemText primary="Admin" secondary="имя"/>
                                </ListItem>
                                <Divider component="li"/>
                            </div>
                            <div style={{minWidth: 320}}>
                                <ListItem>
                                    <ListItemText primary="Admin" secondary="имя"/>
                                </ListItem>
                                <Divider component="li"/>
                            </div>
                            <div style={{minWidth: 320}}>
                                <ListItem>
                                    <ListItemText primary="Admin" secondary="имя"/>
                                </ListItem>
                                <Divider component="li"/>
                            </div>
                            <div style={{minWidth: 320}}>
                                <ListItem>
                                    <ListItemText primary="Admin" secondary="имя"/>
                                </ListItem>
                                <Divider component="li"/>
                            </div>
                            <div style={{minWidth: 320}}>
                                <ListItem>
                                    <ListItemText primary="Admin" secondary="имя"/>
                                </ListItem>
                                <Divider component="li"/>
                            </div>
                            <div style={{minWidth: 320}}>
                                <ListItem>
                                    <ListItemText primary="Admin" secondary="имя"/>
                                </ListItem>
                                <Divider component="li"/>
                            </div>
                            <div style={{minWidth: 320}}>
                                <ListItem>
                                    <ListItemText primary="Admin" secondary="имя"/>
                                </ListItem>
                                <Divider component="li"/>
                            </div>
                            <div style={{minWidth: 320}}>
                                <ListItem>
                                    <ListItemText primary="Admin" secondary="имя"/>
                                </ListItem>
                                <Divider component="li"/>
                            </div>
                            <div style={{minWidth: 320}}>
                                <ListItem>
                                    <ListItemText primary="Admin" secondary="имя"/>
                                </ListItem>
                                <Divider component="li"/>
                            </div>
                        </List>
                    </Block4>
                </Block2>


            </Blocks>
            {/*<Block>*/}
            {/*    <ScrollableTabsButtonForce/>*/}
            {/*</Block>*/}

        </Root>
    );
};

export default Organization;

const Root = styled.div`
  width: 100%;
`;
const Block = styled.div`
  width: 100%;
  margin-bottom: 24px;
  background-color: white;
  padding: 20px;
  //min-height: 200px;
  border-radius: 10px;
  display: flex;
  //justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
`;
const Blocks = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
`;
const Block1 = styled.div`
  //min-width: 10%;
  padding: 16px 0 0 16px;
  //background-color: #ce77ba;

`;
const Block2 = styled.div`
  width: 100%;
`;
const Block3 = styled.div`
  //background-color: #779dce;
  min-height: 50px;
  padding: 16px ;
  display: flex;
  gap: 20px;

  justify-content: space-between;
  align-items: center;
`;
const Block4 = styled.div`
  min-height: 200px;
  padding: 16px;
`;