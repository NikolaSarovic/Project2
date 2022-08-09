import { Dispatch } from "react";
import { Action, Reducer } from "redux";
export interface PasswordStore {
    oldPassword:string,
    newPassword:string,
    repeatPassword:string,
    error:ErrorState,
    submit:SubmitForm
}
const intialPasswordStore:PasswordStore={
    oldPassword:"",
    newPassword:"",
    repeatPassword:"",
    error:{
        newPassword: false,
        currentPassword: false,
        passwordMatch: false
      },
    submit:{
        success:false,
        faild:false
    }
}
export interface ErrorState {
    newPassword: boolean,
    currentPassword: boolean,
    passwordMatch: boolean
}
export interface SubmitForm {
    success:boolean,
    faild:boolean
}


export interface ValueChangeAction {type:"PASSWORD/CHANGEVALUE",payload:PasswordStore}
export interface UpdateAction {type:"PASSWORD/UPDATE",payload:SubmitForm}
export interface ErrorChangeAction {type:"PASSWORD/ERROR",payload:ErrorState}


export type KnownAction=ValueChangeAction | UpdateAction | ErrorChangeAction;

export const actionCreators={
    
    valueChangeAction:(name:string,value:string)=>(dispatch:Dispatch<ValueChangeAction>,getState:Function)=>{
     let passwordStore=JSON.parse(JSON.stringify(getState().password))
     console.log(passwordStore)
     passwordStore[name]=value;
      dispatch({type:"PASSWORD/CHANGEVALUE",payload:passwordStore})
    },

    updateAction:()=> async (dispatch:Dispatch<any>,getState:Function)=>{
      const oldPassword=getState().password.oldPassword;
      const newPassword=getState().password.newPassword;
      const token=localStorage.getItem('token');
      let response=await fetch("https://localhost:7220/UserProfile",{
             method: "POST",
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:JSON.stringify({
                oldPassword:oldPassword,
                newPassword:newPassword})

            })
            if(response.ok)
            {
            console.log("okk")
            dispatch({type:"PASSWORD/UPDATE",payload:{succes:true,faild:false}});
            }
            else
            {
                console.log("bad")
                dispatch({type:"PASSWORD/UPDATE",payload:{succes:false,faild:true}});
            }
            
    },
    errorChangeAction:(name:string,value:boolean)=>(dispatch:Dispatch<any>,getState:Function)=>{
          let errorState=JSON.parse(JSON.stringify(getState().password.error))
         errorState[name]=value;
         console.log(errorState[name])
         console.log(errorState)
          dispatch({type:"PASSWORD/ERROR",payload:errorState})
    }
}

export const reducer:Reducer<PasswordStore>=(state: PasswordStore|undefined, incomingAction: Action): PasswordStore => {
    if(state==undefined)
    return intialPasswordStore;
    const action=incomingAction as KnownAction;
    switch(action.type)
    {
        case "PASSWORD/CHANGEVALUE":
        return action.payload;
        case "PASSWORD/ERROR":
            console.log(action.payload)
            return {...state,error:action.payload};
        case "PASSWORD/UPDATE":
                console.log(action.payload)
            return {...state,submit:action.payload,newPassword:"",oldPassword:"",repeatPassword:""}
        
        default:
            return state;
    }
    
}