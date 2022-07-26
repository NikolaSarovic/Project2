import * as React from 'react';
import Button from '@mui/material/Button';
import {Menu} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { ApplicationState } from '../store';
import { useSelector } from 'react-redux';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';



export default function HeaderMenu(){
  const state = useSelector((state:ApplicationState)=>state.login);
  const logOut  = () :void =>{
    localStorage.clear();
    window.location.reload();
    
}
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button endIcon={<AccountCircleOutlinedIcon/>} variant="contained" {...bindTrigger(popupState)}>
              {`Profile ${state && state.loggedUser && state.loggedUser.userName }`}
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}><Link to="/profile">Profile</Link></MenuItem>
            <MenuItem onClick={popupState.close}><Link to="/changepassword">Change password</Link></MenuItem>
            <MenuItem onClick={popupState.close}><Link to="/createcar">Create post</Link></MenuItem>
            <MenuItem onClick={popupState.close}><Link to="/carmanage">Manage posts</Link></MenuItem>
            <MenuItem onClick={ () =>{logOut(); } }><Link to="/">Logout</Link></MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}