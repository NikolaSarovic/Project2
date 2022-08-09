import React from 'react'
import * as PasswordStore from '../store/PasswordStore'
import { ApplicationState } from '../store';
import { useSelector,useDispatch } from 'react-redux';
import { Button, Grid, TextField, Typography,Alert } from '@mui/material';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import './styles/password.css'




export default function ChangePassword () {
  const dispatch = useDispatch()
  const data = useSelector((appstate:ApplicationState) => appstate.password)
  
 
  const submitForm = () => {
    console.log("souu")
    const validPassword = new RegExp(
      '(.*[A-Z].*)([/./*_@-]+)(.*)'
  );
  
    if(data!.oldPassword.length==0)
    dispatch(PasswordStore.actionCreators.errorChangeAction("currentPassword",true))
    else
    dispatch(PasswordStore.actionCreators.errorChangeAction("currentPassword",false))
    
    if(!validPassword.test(data!.newPassword) || data!.newPassword.length == 0)
      dispatch(PasswordStore.actionCreators.errorChangeAction("newPassword",true))
    else
    dispatch(PasswordStore.actionCreators.errorChangeAction("newPassword",false))

    if(data!.newPassword != data!.repeatPassword || data!.repeatPassword.length==0)
    dispatch(PasswordStore.actionCreators.errorChangeAction("passwordMatch",true))
    else
    dispatch(PasswordStore.actionCreators.errorChangeAction("passwordMatch",false))
   
    dispatch(PasswordStore.actionCreators.updateAction())
  }
  const handleValueChange = (e: any) => {
    const fieldName: string = e.target.name;
    const fieldVal: string = e.target.value;
    dispatch(PasswordStore.actionCreators.valueChangeAction(fieldName, fieldVal));
}
  return (
    <div className='passwordCss'>
         <Grid container spacing={5}>
           <Grid lg={12} item>
              <Typography variant="h3" align="center" color={"#5daeff"}>Change password</Typography>
           </Grid>
               <div style={{display:data!.submit!.success!? "block":"none", marginBottom:"10px"}}>
                <Alert severity="success">You have successfully change password!</Alert>
            </div>
            <div style={{display:data!.submit!.faild!? "block":"none",marginBottom:"10px"}}>
                <Alert severity="error">Error</Alert>
            </div>
           <Grid item lg={12}>
                     <div style={{display:data!.error!.currentPassword?"block":"none",color: 'red'}}>
                        Wrong or emty old password
                      </div>
                    <TextField
                        label="Old password"                      
                        name="oldPassword"
                        type={'password'} 
                        error={data!.error!.currentPassword}
                        onChange={(e) => handleValueChange(e)}       
                        fullWidth>
                    </TextField>
           </Grid>
           <Grid item lg={12}>
                       <div style={{display:data!.error!.newPassword?"block":"none",color: 'red'}}>
                        Wrong regex or emty new password 
                      </div>
                    <TextField
                        label="New password"
                        name="newPassword"
                        type={'password'}
                        error={data!.error!.newPassword}
                        onChange={(e) => handleValueChange(e)}
                        fullWidth>
                    </TextField>
                </Grid>
                <Grid item container lg={12} spacing={2}>
                    <Grid item lg={12}>
                      <div style={{display:data!.error!.passwordMatch?"block":"none",color: 'red'}}>
                        Differnt new password and repeat password or emty 
                      </div>
                        <TextField
                            label="Repeat password"
                            name="repeatPassword"
                            type={'password'}
                            error={data!.error!.passwordMatch}
                            onChange={(e) => handleValueChange(e)}
                            fullWidth
                            >
                        </TextField>
                    </Grid>

                </Grid>
                <Grid item container lg={12} spacing={2}>
                    <Grid item lg={12}>
                        <Button startIcon={<SendSharpIcon />} onClick={() => submitForm()} variant='contained' fullWidth>Submit</Button>
                    </Grid>
                </Grid>

      </Grid>
    </div>
  )
}

 