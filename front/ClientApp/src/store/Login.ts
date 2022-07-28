
import { getBottomNavigationActionUtilityClass } from '@mui/material';
import { Action, Reducer } from 'redux';
import {User} from './Interfaces/UserInterface';

export interface LoginState {
    username: string,
    password: string,
    success:boolean,
    error:boolean,
    loggedUser:User
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
    loggedUser:{
        firstName: null,
        lastName: null,
        city: null,
        number: null,
        country: null,
        userName: null,
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

export type KnownAction = ChangeUsername | ChangePassword | LoginAction | InitUserAction;

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
            let user:User = await userResponse.json() as User
            return {type:'LOGIN/LOGIN',payload:{status:ResponseStatus.Success, user:user}}
        }
        else{
            return {type:'LOGIN/LOGIN',payload:{status:ResponseStatus.Success, user:null}}
        }
    },
    initUser: async () : Promise<InitUserAction> =>  {
        let response = await fetch("https://localhost:7220/UserProfile",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }})
           let user:User = await response.json() as User
           return {type:"LOGIN/INITUSER",payload:user}
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action): LoginState => {
    if (state === undefined) {
        return initialState;
    }
    console.log(incomingAction)
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
            console.log("fdsafdsa")
            return {...state, loggedUser: action.payload}
        default:
            return state;
    }
};
