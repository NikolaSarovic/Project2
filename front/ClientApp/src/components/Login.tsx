import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import * as LoginStore from '../store/Login'
import {Alert, TextField, Button} from '@mui/material';
import './styles/loginStyle.css';
import { actionCreators } from '../store/WeatherForecasts';

function Login() {
    const dispatch = useDispatch();
    const state = useSelector((state: ApplicationState) => state.login)
    const onInputUsernameChange = (e: HTMLInputElement) => {
        dispatch(LoginStore.actionCreators.changeUsernameValue(e.value));
    }
    const onInputPasswordChange = (e: HTMLInputElement) => {
        dispatch(LoginStore.actionCreators.changePasswordValue(e.value));
    }
    const onSubmit = async () => {
        dispatch(await LoginStore.actionCreators.login({username:state!.username, password:state!.password}))

    }
    return (
        <div className='loginForm'>
            <div style={{display:state!.error!?"block":"none"}}>
                <Alert severity="error">Error</Alert>
            </div>
            <div style={{display:state!.success!?"block":"none", marginBottom:"10px"}}>
                <Alert severity="success">You have successfully logged in!</Alert>
            </div>
            <TextField label="Username" margin='dense' onChange={e => onInputUsernameChange(e.target as HTMLInputElement)}></TextField>
            <TextField label="Password" margin="dense" type='password' onChange={e => onInputPasswordChange(e.target as HTMLInputElement)}></TextField>
            <Button variant="contained" onClick={(e:any) => onSubmit()}>Login</Button>
        </div>
    )
}

export default Login