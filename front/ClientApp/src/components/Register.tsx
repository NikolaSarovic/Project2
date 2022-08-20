import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { ApplicationState } from '../store/index';
import * as RegisterStore  from '../store/RegisterStore';
import {Alert, TextField, Button, Typography} from '@mui/material';
import './styles/registationStyle.css';


function Register() {
    
    const dispatch = useDispatch();
    
    const state=useSelector((state:ApplicationState)=>state.register);
  
    
    const onInputUsernmaChange=(e:HTMLInputElement)=>{
        dispatch(RegisterStore.actionCreators.changeUsernameValue(e.value));
      
    }
    const onInputEmailChange=(e:HTMLInputElement)=>{
        dispatch(RegisterStore.actionCreators.changeEmailValue(e.value));
    }
    const onInputPasswordChange=(e:HTMLInputElement)=>{
        dispatch(RegisterStore.actionCreators.changePasswordValue(e.value));
    }
    const onSubmit=async ()=>{
        const vaildUsername=new RegExp (
            '([A-Z])[a-zA-Z0-9.-]+'
        );
        const validEmail = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
        );
        const validPassword = new RegExp(
            '(.*[A-Z].*)([/./*_@-]+)(.*)'
        );
        if(!vaildUsername.test(state!.username) || state!.username.length==0)
        dispatch(RegisterStore.actionCreators.errorChangeAction("usernameError",true))
        else
        dispatch(RegisterStore.actionCreators.errorChangeAction("usernameError",false))
        if(!validEmail.test(state!.email) || state!.email.length==0)
        dispatch(RegisterStore.actionCreators.errorChangeAction("emailError",true))
        else
        dispatch(RegisterStore.actionCreators.errorChangeAction(" emailError",false))
        if(!validPassword.test(state!.password) || state!.password.length==0)
        dispatch(RegisterStore.actionCreators.errorChangeAction("passwordError",true))
        else
        dispatch(RegisterStore.actionCreators.errorChangeAction("passwordError",false))

        dispatch(await RegisterStore.actionCreators.register({username:state!.username,email:state!.email,password:state!.password}))
    }

    return (
    
        <div className='registrationForm'>
             <Typography variant="h3" align="center" color={"#5daeff"}>Registration</Typography>
            <div style={{display:state!.error!?"block":"none"}}>
                <Alert severity="error">The action failed</Alert>
            </div>
            <div style={{display:state!.success!?"block":"none", marginBottom:"10px"}}>
                <Alert severity="success">You have successfully logged in!</Alert>
            </div>
        <div>
        <div style={{display:state!.errorForm!.usernameError?"block":"none",color: 'red'}}>
                        Wrong regex or emty username
                      </div>
        <TextField label="Username" margin="dense"    error={state!.errorForm!.usernameError}  onChange={e=>onInputUsernmaChange(e.target as HTMLInputElement)}></TextField>
        <div style={{display:state!.errorForm!.emailError?"block":"none",color: 'red'}}>
                        Wrong regex or emty email
                      </div>
        <TextField label="Email" margin="dense"  error={state!.errorForm!.emailError}  onChange={e=>onInputEmailChange(e.target as HTMLInputElement)}></TextField>
        <div style={{display:state!.errorForm!.passwordError?"block":"none",color: 'red'}}>
                        Wrong regex or emty password
                      </div>
        <TextField label="Password" margin="dense" type='password' error={state!.errorForm!.passwordError} onChange={e=>onInputPasswordChange(e.target as HTMLInputElement)} ></TextField>
        <Button variant="contained"  onClick={()=>onSubmit()}>Registration</Button>
        </div>
        </div>
    )
}

export default Register