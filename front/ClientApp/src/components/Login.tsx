import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../store/index';
import * as LoginStore from '../store/Login'

function Login() {
    const dispatch = useDispatch();
    const state = useSelector((state: ApplicationState) => state.login)
    const onInputUsernameChange = (e: HTMLInputElement) => {
        dispatch(LoginStore.actionCreators.changeUsernameValue(e.value));
    }
    const onInputPasswordChange = (e: HTMLInputElement) => {
        dispatch(LoginStore.actionCreators.changePasswordValue(e.value));
    }
    const onSubmit = () =>{
        console.log(state)
        dispatch(LoginStore.actionCreators.login({username:state!.username, password:state!.password}))
    }
    return (
        <div>
            <input type="text" value={state!.username} onChange={e => onInputUsernameChange(e.target as HTMLInputElement)} />
            <input type="password" value={state!.password} onChange={e => onInputPasswordChange(e.target as HTMLInputElement)} />
            <button onClick={(e:any) => onSubmit()}>Login</button>
        </div>
    )
}

export default Login