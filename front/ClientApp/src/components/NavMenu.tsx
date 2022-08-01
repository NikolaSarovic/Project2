import { Button, TextField } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as LoginStore from '../store/Login';
import * as homeStore from '../store/homeStore';
import './styles/navMenu.css';
import HeaderMenu from './HeaderMenu';


function NavMenu() {
    const state : LoginStore.LoginState = useSelector((state:ApplicationState)=>state.login!)
    const stateSearch=useSelector((state:ApplicationState)=>state.home)
    const dispatch = useDispatch()

    const onSearchChange = async (e:HTMLInputElement) =>{
        console.log(homeStore.actionCreators.searchChangeAction(e.value));
        dispatch(await homeStore.actionCreators.searchChangeAction(e.value));
    }
    const  onSubmit = async  () =>{
        console.log(homeStore.actionCreators.searchCarAction(stateSearch!.searchChange));
        dispatch(await homeStore.actionCreators.searchCarAction(stateSearch!.searchChange));
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
            <div >
            <TextField label="Search" margin="dense"  variant="outlined" type='text' onChange={e => onSearchChange(e.target as HTMLInputElement)}></TextField>
            <Button variant="contained" onClick={(e:any) => onSubmit()} >Search</Button>
            </div>
            <div style={{display:(state!.loggedUser == null ? "block" : "none")}}>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            <div style={{display:state!.loggedUser == null ? "none" : "block"}}>
                 <HeaderMenu></HeaderMenu>
            </div>
        </header> )
}

export default NavMenu