import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { ApplicationState } from '../store/index';
import * as RegisterStore  from '../store/RegisterStore';


function Register() {
    
    const dispatch = useDispatch();
    
    const state=useSelector((state:ApplicationState)=>state.register);
    console.log(state);
    const onInputUsernmaChange=(e:HTMLInputElement)=>{
        dispatch(RegisterStore.actionCreators.changeUsernameValue(e.value));
      //  console.log(state!.username);
    }
    const onInputEmailChange=(e:HTMLInputElement)=>{
        dispatch(RegisterStore.actionCreators.changeEmailValue(e.value));
    }
    const onInputPasswordChange=(e:HTMLInputElement)=>{
        dispatch(RegisterStore.actionCreators.changePasswordValue(e.value));
    }

    return (
        
        <div>{localStorage.getItem("token")}
        <input type='text' value={state!.username} onChange={e=>onInputUsernmaChange(e.target as HTMLInputElement)}></input>
        <input type='text' value={state!.email} onChange={e=>onInputEmailChange(e.target as HTMLInputElement)}></input>
        <input type='text' value={state!.password} onChange={e=>onInputPasswordChange(e.target as HTMLInputElement)}></input>
        </div>
    )
}

export default Register