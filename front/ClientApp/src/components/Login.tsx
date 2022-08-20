import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import * as LoginStore from '../store/Login'
import {Alert, TextField, Button, Typography} from '@mui/material';
import './styles/loginStyle.css';


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
        if(state!.username!.length==0)
        dispatch(LoginStore.actionCreators.errorChangeAction("userError",true))
        else
        dispatch(LoginStore.actionCreators.errorChangeAction("userError",false))
        if(state!.password!.length==0)
        dispatch(LoginStore.actionCreators.errorChangeAction("passError",true))
        else
        dispatch(LoginStore.actionCreators.errorChangeAction("passError",false))

        dispatch(await LoginStore.actionCreators.login({username:state!.username, password:state!.password}))

    }
    return (
        <div className='loginForm'>
             <Typography variant="h3" align="center" color={"#5daeff"}>Login</Typography>
            <div style={{display:state!.error!?"block":"none"}}>
                <Alert severity="error">The action failed</Alert>
            </div>
            <div style={{display:state!.success!?"block":"none", marginBottom:"10px"}}>
                <Alert severity="success">You have successfully logged in!</Alert>
            </div>
            <TextField label="Username" margin='dense' error={state!.errorForm!.userError} onChange={e => onInputUsernameChange(e.target as HTMLInputElement)}></TextField>
            <TextField label="Password" margin="dense" type='password' error={state!.errorForm!.passError} onChange={e => onInputPasswordChange(e.target as HTMLInputElement)}></TextField>
            <Button variant="contained" onClick={(e:any) => onSubmit()}>Login</Button>
        </div>
    )
}

export default Login