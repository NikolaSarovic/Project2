import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector,useDispatch } from 'react-redux';
import { ApplicationState } from '../store';
import * as LoginStore from '../store/Login';
import * as ProfileStore from '../store/ProfileStore';
import './styles/profile.css';



export default  function Profile() {
    const state : LoginStore.LoginState = useSelector((state:ApplicationState)=>state.login!);
    const stateProfile=useSelector((stateProfile:ApplicationState)=>stateProfile.profile);
    const statea=useSelector((state:ApplicationState)=>state);
   const dispatch = useDispatch();
   const handleClickOpen=()=>{
        dispatch(ProfileStore.actionCreators.changeButtonOpen(true))
   }
   const handleClose=()=>{
      dispatch(ProfileStore.actionCreators.changeButtonOpen(false))
   }
   const handleValueChange=(e:any)=>{
    const fieldName: string = e.target.name;
    const fieldVal: string = e.target.value;
    dispatch(ProfileStore.actionCreators.changeValue(fieldName,fieldVal))
   }
   const onSubmit=async ()=>{
     dispatch(await ProfileStore.actionCreators.confirmFom())
   };
   useEffect(()=>{
    
    if(localStorage.getItem("token") != null){
    (async function(){
        dispatch(await LoginStore.actionCreators.initUser()) 
    })()
}
},[])
    
  return (
    <div className='profileForm'>
          <img src={`${process.env.PUBLIC_URL}/user.png`} alt="profile" />
          <div className='profileData'>
          <h3>Username: {state && state.loggedUser && state.loggedUser.userName}</h3>
          <h3>First name:{state && state.loggedUser && state!.loggedUser!.firstName}</h3>
          <h3>Last name:{state && state.loggedUser && state!.loggedUser!.lastName}</h3>
          <h3>City:{state && state.loggedUser && state!.loggedUser!.city}</h3>
          <h3>Number:{state && state.loggedUser && state!.loggedUser!.number}</h3>
          <h3>Country:{state && state.loggedUser && state!.loggedUser!.country}</h3>
          <h3>Email:{state && state.loggedUser && state!.loggedUser!.email}</h3>
          <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Update
           </Button>
           <Dialog open={stateProfile!.buttonOpen}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the correct data to modify your user account
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="userName"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={state && state.loggedUser && state.loggedUser.userName}
            onChange={(e) => handleValueChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="First name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={state && state.loggedUser && state.loggedUser.firstName}
            onChange={(e) => handleValueChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            name="lastName"
            label="Last name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={state && state.loggedUser && state.loggedUser.lastName}
            onChange={(e) => handleValueChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            name="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={state && state.loggedUser && state.loggedUser.city}
            onChange={(e) => handleValueChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            name="number"
            label="Number"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={state && state.loggedUser && state.loggedUser.number}
            onChange={(e) => handleValueChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            name="country"
            label="Country"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={state && state.loggedUser && state.loggedUser.country}
            onChange={(e) => handleValueChange(e)}
          />
           <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={state && state.loggedUser && state.loggedUser.email}
            onChange={(e) => handleValueChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
           </div>

          </div>
          
          
        
    </div>
  )
}

