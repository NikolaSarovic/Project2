import { Action, Reducer } from 'redux';


export interface RegisterState
{
    username:string,
    email:string,
    password:string,
    success:boolean,
    error:boolean,

}
const initialState:RegisterState=
{
    username:"",
    email:"",
    password:"",
    success:false,
    error:false,

}
interface RegisterData
{
    username:string,
    email:string,
    password:string
}
interface RegisterActionPayload 
{
      status:ResponseStatus;
}
export enum ResponseStatus{
    Success,
    Error
}


export interface ChangeUsername {type:'REGISTER/CHANGUSERNAME', payload:string}
export interface ChangeEmail {type:'REGISTER/CHANGEMAIL',payload:string}
export interface ChangePassword {type:'REGISTER/CHANGEPASSWORD',payload:string}
export interface RegisterAction {type:'REGISTER/REGISTER',payload:RegisterActionPayload}

export type KnownAction = ChangeUsername | ChangeEmail| ChangePassword | RegisterAction

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
    register:async (registerData:RegisterData)=>{
        let response=await fetch("https://localhost:7220/Authenticate/register",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({
               username:registerData.username,
               email:registerData.email,
               password:registerData.password
            })
        });
        if(response.ok)
        {
            console.log("action")
            console.log({type:'REGISTER/REGISTER',payload:{status:ResponseStatus.Success}})
           return {type:'REGISTER/REGISTER',payload:{status:ResponseStatus.Success}}
        }
        else
          return {type:'REGISTER/REGISTER',payload:{status:ResponseStatus.Error}}
        
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
        case 'REGISTER/REGISTER':
            if(ResponseStatus.Success==action.payload.status)
            return {...state,success:true,error:false}
            else(ResponseStatus.Error==action.payload.status)
            return {...state,success:false,error:true}
          
        default:
           return state;
        
    }
    
}