import { Action, Reducer } from 'redux';
import { Dispatch } from "react";
import {User} from './Interfaces/UserInterface';
import { getStepLabelUtilityClass } from '@mui/material';


export interface ProfileState
{
    buttonOpen:boolean,
    confirmUser:User | null

}

const initialState:ProfileState={
    buttonOpen:false,
    confirmUser:{
        firstName:"",
        lastName:"",
        city: "",
        number: 0,
        country: "",
        userName: "",
        email:""
    }
}

export interface ChangeButtonOpen {type:'PROFILE/BUTTONOPEN',payload:boolean}
export interface ConfirmForm {type:'PROFILE/CONFIRM', payload:User}
export interface ValueChangeAction {type:'PROFILE/CHANGEVALUE',payload:User}
export interface InitUser {type:'PROFILE/INITUSER',payload:User}
export type KnownAction=ChangeButtonOpen | ConfirmForm | ValueChangeAction | InitUser;

export const actionCreators={

    initUser: async()=>{
        let userResponse = await fetch("https://localhost:7220/UserProfile",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }})
            let user:User = await userResponse.json() as User
            return {type:'PROFILE/INITUSER',payload:{user:user}}
    },
    
    changeButtonOpen:(value:boolean)=>{
        return  {type:'PROFILE/BUTTONOPEN',payload:value}
    },
    confirmFom:async () => async (dispatch:Dispatch<any>,getState:Function)=>{
        const bod = {
            firstName:getState().profile.firstName,
            lastName: getState().profile.lastName,
            city: getState().profile.city,
            number: getState().profile.number,
            country: getState().profile.country,
            username: getState().profile.username,
            email: getState().profile.email};
        let response = await fetch("https://localhost:7220/UserProfile",{
            method:"PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify(bod)
        })
        
        console.log(response)
        if(response.ok)
        {
            console.log("oke")
            //dispatch({type:'PROFILE/CONFIRM', payload:user})
        }
        else
        console.log("bad")
    },
    changeValue:(name: string, value: string)=>(dispatch:Dispatch<ValueChangeAction>,getState:Function)=>{
        let profileState=JSON.parse(JSON.stringify(getState().profile.confirmUser))
        console.log(profileState)
        profileState[name]=value;  
        dispatch({ type: 'PROFILE/CHANGEVALUE', payload:profileState});
     
       
    }
}
export const reducer:Reducer<ProfileState>=(state:ProfileState | undefined,incomingAction: Action):ProfileState=>{
    if (state === undefined) {
        return initialState;
    }
    const action = incomingAction as KnownAction;
    console.log(action)
    switch (action.type) {
        case 'PROFILE/BUTTONOPEN':
            return {...state,buttonOpen:action.payload}
        case 'PROFILE/CONFIRM':
            return {...state,confirmUser:action.payload}
        case 'PROFILE/CHANGEVALUE':
            return {...state,confirmUser:action.payload}
        default:
        return state;
    }

}

