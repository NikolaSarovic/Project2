import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as LoginStore from '../store/Login';


function NavMenu() {
    const state : LoginStore.LoginState = useSelector((state:ApplicationState)=>state.login!)
    const dispatch = useDispatch()
    const logOut  = () :void =>{
        localStorage.clear();
        window.location.reload();
    }
    useEffect(()=>{
        if(localStorage.getItem("token") != null){
        (async function(){
            dispatch(await LoginStore.actionCreators.initUser()) 
        })()
    }
    },[])
    return (
        <header>
            {console.log(state!.loggedUser)}
            <div style={{display:(state!.loggedUser == null ? "block" : "none")}}>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
            <div style={{display:state!.loggedUser == null ? "none" : "block"}}>
                
                <h6>{` is logged in`}</h6>
                <button onClick={()=> logOut()}>Log out</button>
            </div>
        </header> )
}

export default NavMenu