import { Button, TextField } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as LoginStore from '../store/Login';
import './styles/navMenu.css'

function NavMenu() {
    const state : LoginStore.LoginState = useSelector((state:ApplicationState)=>state.login!)
    const dispatch = useDispatch()
    const logOut  = () :void =>{
        localStorage.clear();
        window.location.reload();
    }
    const [searchState,setSeacrhState] = useState("");
    const onSearchChange = (e:any) =>{
        setSeacrhState(e.value);
    }
    const onSubmit = () =>{

    }
    useEffect(()=>{
        if(localStorage.getItem("token") != null){
        (async function(){
            dispatch(await LoginStore.actionCreators.initUser()) 
        })()
    }
    },[])
    return (
        <header className='header'>
            <div className="logo">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="" />
                <h6>Sharcar store</h6>
            </div>
          
            <div style={{display:(state!.loggedUser == null ? "block" : "none")}}>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            <div style={{display:state!.loggedUser == null ? "none" : "block"}}>
            <TextField label="Search" margin="dense"  variant="outlined" type='text' value={searchState} onChange={e => onSearchChange(e.target as HTMLInputElement)}></TextField>
            <Button variant="contained" onClick={(e:any) => onSubmit()} >Login</Button>
            </div>
            <div style={{display:state!.loggedUser == null ? "none" : "block"}}>
                <h6>{` is logged in`}</h6>
                <button onClick={()=> logOut()}>Log out</button>
            </div>
        </header> )
}

export default NavMenu