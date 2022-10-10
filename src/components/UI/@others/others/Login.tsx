import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {observer} from "mobx-react-lite";
import loginBackGround from '../../../../assets/images/LoginBackGround.png'
import styled from "styled-components";
import {useContext} from "react";
import {Context} from "../../../../context";
import {useNavigate} from "react-router-dom";
import logo from '../../../../assets/images/logo.png'
import Copyright from "../atoms/Copyright";


function Login() {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <CssBaseline/>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${loginBackGround})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                }}
            >
                <Logo src={logo} alt={'logo'}/>
                <Title>Welcome to democracy</Title>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <LoginContainer>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography sx={{
                            alignSelf: 'flex-start',
                            fontWeight: '700',
                            fontSize: '2rem'
                        }}>
                            Welcome back!
                        </Typography>
                        <Typography sx={{
                            alignSelf: 'flex-start',
                            color: 'text.secondary',
                            fontSize: '1.125rem'
                        }}>
                            Please login to access your account.
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1, width: '100%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={() => {
                                    // stores.login('')
                                    navigate('/');
                                }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="src/components/UI/@others/others/Login#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                {/*<Grid item>*/}
                                {/*    <Link href="#" variant="body2">*/}
                                {/*        {"Don't have an account? Sign Up"}*/}
                                {/*    </Link>*/}
                                {/*</Grid>*/}
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </LoginContainer>
            </Grid>
        </Grid>
    );
}

export default observer(Login);

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.img`
  width: 223px;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%,-35%);
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
`;
const Title = styled.div`
  position: absolute;
  text-align: center;
  bottom: 40px;
  width: 100%;
  font-size: 18px;
  color: white;
  left: 0;
`;