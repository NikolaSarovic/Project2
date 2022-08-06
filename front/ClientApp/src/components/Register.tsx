import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { ApplicationState } from '../store/index';
import * as RegisterStore  from '../store/RegisterStore';
import {Alert, TextField, Button} from '@mui/material';
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
        
        console.log("souu");
        dispatch(await RegisterStore.actionCreators.register({username:state!.username,email:state!.email,password:state!.password}))
    }

    return (
    
        <div className='registrationForm'>
            <div style={{display:state!.error!?"block":"none"}}>
                <Alert severity="error">Error</Alert>
            </div>
            <div style={{display:state!.success!?"block":"none", marginBottom:"10px"}}>
                <Alert severity="success">You have successfully logged in!</Alert>
            </div>
        <div>
        <TextField label="Username" margin="dense"  onChange={e=>onInputUsernmaChange(e.target as HTMLInputElement)}></TextField>
        <TextField label="Email" margin="dense"   onChange={e=>onInputEmailChange(e.target as HTMLInputElement)}></TextField>
        <TextField label="Password" margin="dense" type='password' onChange={e=>onInputPasswordChange(e.target as HTMLInputElement)} ></TextField>
        <Button  onClick={()=>onSubmit()}>Registration</Button>
        </div>
        </div>
    )
}

export default Register