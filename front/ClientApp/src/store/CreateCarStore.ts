import { Dispatch } from "react";
import { Action, Reducer } from "redux";
import { BrandModel } from "./Interfaces/BrandModel";

export interface CreateCarStore {
    brandModel:BrandModel[],
    checkModelId:string,
    imageFile: any,
    checkCarForm:CarForm 
}
const intialCreateCarStore:CreateCarStore={
   brandModel:[],
   checkModelId:"",
   imageFile:null,
   checkCarForm:{
    color:"",
    numberDors:0,
    description:"",
    price:0,
    state:""
   }
}
export interface CarForm {
    color:string,
    numberDors:number,
    description:string,
    price:number,
    state:string 
}
interface FileChangePayload {
    name: string;
    value: any;
}

export interface InitBrandModelAction {type:"CREATE/BRANDMODEL",payload:BrandModel[]};
export interface CheckModelIdAction {type:"CREATE/CHECKMODELID",payload:string};
export interface ValueFormAction {type:"CREATE/VALUEFORM",payload:CarForm}
export interface ChangeImageAction {type:"CREATE/CHANGEIMAGE",payload:FileChangePayload}

export type KnownAction=InitBrandModelAction | CheckModelIdAction | ValueFormAction | ChangeImageAction;

export const actionCreators={
    initBrandModelAction:()=> async (dispatch:Dispatch<any>,getState:Function)=>{
        const token=localStorage.getItem('token');
       
      let response=await fetch("https://localhost:7220/CarBrandModel/GetBrandsModels",{
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body:null });
     
       const brandmodel:BrandModel[]=await response.json() as BrandModel[];
        dispatch({type:"CREATE/BRANDMODEL",payload:brandmodel})
    },
    checkModelIdAction:(value:string)=> async (dispatch:Dispatch<any>,getState:Function)=>{
      let carStore=JSON.parse(JSON.stringify(getState().car.checkModelId))
      carStore=value;
      dispatch({type:"CREATE/CHECKMODELID",payload:carStore})
    },
    valueFormAction:(name:string,value:string)=> async (dispatch:Dispatch<any>,getState:Function)=>{
        let carStore=JSON.parse(JSON.stringify(getState().car. checkCarForm))
        carStore[name]=value;
        dispatch({type:"CREATE/VALUEFORM",payload:carStore})
    },
    chaneImageAction:(e:any)=> async (dispatch:Dispatch<any>,getState:Function)=>{
        let imageState=JSON.parse(JSON.stringify(getState().car.imageFile))
        let name=e.target.name;
        let value=e.target.files;
        dispatch({type:"CREATE/CHANGEIMAGE",payload:{name:name,value:value}})
   },
    addCar:()=> async (dispatch:Dispatch<any>,getState:Function)=>{
        let stateModelId=JSON.parse(JSON.stringify(getState().car.checkModelId))
      let stateForm:CarForm=JSON.parse(JSON.stringify(getState().car.checkCarForm))
      let stateImage=JSON.parse(JSON.stringify(getState().car.imageFile))
      const token=localStorage.getItem('token');
      var data = new FormData()
        data.append('file',stateImage)
      let response=fetch(`https://localhost:7220/Car/CreateCar?modelId=${stateModelId}&color=${stateForm.color}&numberDors=${stateForm.numberDors}&description=${stateForm.description}&price=${stateForm.price}&state=${stateForm.state}`,{
        method: "POST",
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
       },
       body:data
   })
   console.log(response)
    
   }
}

export const reducer:Reducer<CreateCarStore>=(state: CreateCarStore|undefined, incomingAction: Action): CreateCarStore => {
    if(state==undefined)
    return intialCreateCarStore;
    
    const action = incomingAction as KnownAction;
    switch(action.type)
    {
        case "CREATE/BRANDMODEL":
            return {...state,brandModel:action.payload}
        case "CREATE/CHECKMODELID":
            return {...state,checkModelId:action.payload}
        case "CREATE/VALUEFORM":
            console.log(action.payload)
            return {...state,checkCarForm:action.payload}
        case "CREATE/CHANGEIMAGE":
            console.log(action.payload)
            return {...state,imageFile:action.payload}

        default:
        return state;
    }
  
}
