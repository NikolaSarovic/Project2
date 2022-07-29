import { Action, Reducer } from 'redux';


export interface RegisterState
{
    username:string,
    email:string,
    password:string

}
interface RegisterData
{
    username:string,
    email:string,
    password:string
}
const initialState:RegisterState={
    username:"",
    email:"",
    password:""
}

export interface ChangeUsername {type:'REGISTER/CHANGUSERNAME', payload:string}
export interface ChangeEmail {type:'REGISTER/CHANGEMAIL',payload:string}
export interface ChangePassword {type:'REGISTER/CHANGEPASSWORD',payload:string}
export interface RegisterAction {type:'REGISTER/REGISTER'}

export type KnownAction = ChangeUsername | ChangeEmail| ChangePassword

export const actionCreators={
    changeUsernameValue:(value:string)=>{
        return {type:'REGISTER/CHANGUSERNAME',payload:value}
    },
    changeEmailValue:(value:string)=>{
       return {type:'REGISTER/CHANGEMAIL',payload:value}
    },
    changePasswordValue:(value:string)=>{
        return {type:'REGISTER/CHANGEPASSWORD',payload:value}
    },
    register:(registerData:RegisterData)=>{
        
    }
}

export const reducer:Reducer<RegisterState> =(state:RegisterState |undefined ,incomingAction:Action):RegisterState=>{

    if(state===undefined) {
        return initialState;
    }
    const action=incomingAction as KnownAction;
    switch(action.type)
    {
        case 'REGISTER/CHANGUSERNAME':
            return {...state,username:action.payload}
        case 'REGISTER/CHANGEMAIL':
            return {...state,email:action.payload}
        case 'REGISTER/CHANGEPASSWORD':
            return {...state,password:action.payload}
        default:
           return state;
        
    }
    
}