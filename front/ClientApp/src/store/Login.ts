
import { getBottomNavigationActionUtilityClass } from '@mui/material';
import { Action, Reducer } from 'redux';
import { Dispatch } from "react";
import {User} from './Interfaces/UserInterface';

export interface LoginState {
    username: string,
    password: string,
    success:boolean,
    error:boolean,
    loggedUser:User | null,
    confirmUser:User | null
    buttonOpen:boolean,
    errorForm:ErrorState
}
export interface ErrorState {
    userError:boolean,
    passError:boolean
}


interface LoginData {
    username: string,
    password: string
}

const initialState: LoginState = {
    username: '',
    password: '',
    error:false,
    success:false,
    loggedUser:null,
    buttonOpen:false,
    confirmUser:null,
    errorForm:{
        userError:false,
        passError:false
    }
}
interface LoginActionPayload{
    status:ResponseStatus,
    user:User | null
}
export enum ResponseStatus{
    Success,
    Error
}
export interface ChangeUsername { type: 'LOGIN/CHANGEUSERNAME', payload: string }
export interface ChangePassword { type: 'LOGIN/CHANGEPASSWORD', payload: string }
export interface LoginAction { type: 'LOGIN/LOGIN',payload: LoginActionPayload}
export interface InitUserAction { type: 'LOGIN/INITUSER', payload:User }
export interface ChangeButtonOpen {type:'PROFILE/BUTTONOPEN',payload:boolean}
export interface ValueChangeAction {type:'PROFILE/CHANGEVALUE',payload:User}
export interface ConfirmForm {type:'PROFILE/CONFIRM', payload:LoginActionPayload}
export interface ErrorChangeAction {type:"LOGIN/ERROR",payload:ErrorState}

export type KnownAction = ChangeUsername | ChangePassword | LoginAction | InitUserAction |ChangeButtonOpen |ValueChangeAction |ConfirmForm | ErrorChangeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    changeUsernameValue: (value: string) => {
        return { type: "LOGIN/CHANGEUSERNAME", payload: value }
    },
    changePasswordValue: (value: string) => {
        return { type: "LOGIN/CHANGEPASSWORD", payload: value }
    },
    login: async (loginData:LoginData) :Promise<LoginAction> =>  {
        let response = await fetch("https://localhost:7220/Authenticate/login",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({
                username:loginData.username,
                password:loginData.password})
        }) 
        
        
        if(response.ok){
            const okResponse = await response.json()
            localStorage.setItem("token",okResponse.token)
            let userResponse = await fetch("https://localhost:7220/UserProfile",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }})
            let user:User = await userResponse.json() as User;

            console.log(user)
            return {type:'LOGIN/LOGIN',payload:{status:ResponseStatus.Success, user:user}}
        }
        else{
            return {type:'LOGIN/LOGIN',payload:{status:ResponseStatus.Error, user:null}}
        }
    },
    initUser: async () : Promise<InitUserAction> => {
        let response = await fetch("https://localhost:7220/UserProfile",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }})
           let user:User = await response.json() as User
           return {type:"LOGIN/INITUSER",payload:user}
    },
    changeButtonOpen:(value:boolean)=>{
        return  {type:'PROFILE/BUTTONOPEN',payload:value}
    },
    changeValue:(name: string, value: string)=>(dispatch:Dispatch<ValueChangeAction>,getState:Function)=>{
        let profileState=JSON.parse(JSON.stringify(getState().login.confirmUser))
        console.log(profileState)
        profileState[name]=value;  
        dispatch({ type: 'PROFILE/CHANGEVALUE', payload:profileState});     
    },
    confirmForm:async () => async (dispatch:Dispatch<any>,getState:Function)=>{
        const bod = {
            firstName:getState().login.confirmUser.firstName,
            lastName: getState().login.confirmUser.lastName,
            city: getState().login.confirmUser.city,
            number: getState().login.confirmUser.number,
            country: getState().login.confirmUser.country,
            userName: getState().login.confirmUser.userName,
            email: getState().login.confirmUser.email };
            let response = await fetch("https://localhost:7220/UserProfile",{
                method:"PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                },
                body: JSON.stringify(bod)
            })
            console.log("AAA")
            console.log(bod);
            if(response.ok)
            {
                console.log("oke")
                dispatch({type:"LOGIN/INITUSER", payload:bod})
                dispatch({type:"PROFILE/CONFIRM", payload:{status:ResponseStatus.Success, user:bod}})
            }
            else
            {
            console.log("bad")
            dispatch({type:"PROFILE/CONFIRM", payload:{status:ResponseStatus.Error, user:bod}})
            }
    },
    errorChangeAction:(name:string,value:boolean)=>(dispatch:Dispatch<any>,getState:Function)=>{
        let errorState=JSON.parse(JSON.stringify(getState().login.errorForm))
       errorState[name]=value;
        dispatch({type:"LOGIN/ERROR",payload:errorState})
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action): LoginState => {
    if (state === undefined) {
        return initialState;
    }
  
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOGIN/CHANGEUSERNAME':
            return { ...state, username: action.payload }
        case 'LOGIN/CHANGEPASSWORD':
            console.log(state)
            return { ...state, password: action.payload }
        case 'LOGIN/LOGIN':
            if(action.payload.status == ResponseStatus.Success)
                return {...state, success:true, error:false, loggedUser :action.payload.user!}
            else(action.payload.status == ResponseStatus.Error)
                return {...state, error:true, success:false}
        case 'LOGIN/INITUSER':
            state.confirmUser=action.payload;
            console.log(state.confirmUser)
            return {...state, loggedUser: action.payload}
        case 'PROFILE/BUTTONOPEN':
                state.error=false;
                state.success=false;
                return {...state,buttonOpen:action.payload}
        case 'PROFILE/CHANGEVALUE':
                    return {...state,confirmUser:action.payload}
        case 'PROFILE/CONFIRM':
            console.log("BBBBB")
            console.log(action.payload.status )
            if(action.payload.status == ResponseStatus.Success)
            return {...state, success:true, error:false, loggedUser :action.payload.user!}
        else(action.payload.status == ResponseStatus.Error)
            return {...state, error:true, success:false}
        case 'LOGIN/ERROR':
            return {...state,errorForm:action.payload};
        default:
            return state;
    }
};
