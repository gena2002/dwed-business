import React from 'react';
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import MyListItemText from "../atoms/MyListItemText";

const UserProfile = () => {
    return (
        <Root>
            <Blocks>
                <Block1>
                    <Avatar sx={{width: 196, height: 196, margin: '0 auto', borderRadius: 5}}></Avatar>
                    <Typography variant={'subtitle2'} color={'text.secondary'}>@username</Typography>
                </Block1>
                <Block2>
                    <Block4>
                        <List
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                padding: 0,
                                gap: '10px',
                            }}
                        >
                            <MyListItemText primary={'Геннадий'} secondary={'имя'}/>
                            <MyListItemText primary={'Харатьян'} secondary={'фамилия'}/>
                            <MyListItemText primary={'Сергеевич'} secondary={'отчество'}/>
                            <MyListItemText primary={'Мужской'} secondary={'пол'}/>
                            <MyListItemText primary={'Христианство'} secondary={'религия'}/>
                            <MyListItemText primary={'Frontend разработчик'} secondary={'професия'}/>
                            <MyListItemText primary={'Ташкент'} secondary={'регион'}/>
                            <MyListItemText primary={'Нет'} secondary={'пнфл'}/>
                            <MyListItemText primary={'01.09.2022'} secondary={'дата создания'}/>
                            <MyListItemText primary={'07.10.2002'} secondary={'День Рождения'}/>
                            <MyListItemText primary={'haratian.gena@gmail.com'} secondary={'e-mail'}/>
                            <MyListItemText primary={'+998972386505'} secondary={'телефон'}/>
                        </List>
                    </Block4>
                </Block2>
            </Blocks>
        </Root>
    );
};

export default UserProfile;

const Root = styled.div`
  width: 100%;
`;
const Blocks = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  gap: 20px;
`;
const Block1 = styled.div`
  padding: 16px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const Block2 = styled.div`
  width: 100%;
`;
const Block4 = styled.div`
  min-height: 200px;
  padding: 16px;
`;