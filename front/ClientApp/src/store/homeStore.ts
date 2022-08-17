import { Dispatch } from "react";
import { Action, Reducer } from "redux";
import { Car } from './Interfaces/HomeInterfaces';


export interface HomeState{
    cars: Car[],
    currentPage:number,
    numberOfPages:number,
    searchChange:string,
    btnSearch:boolean,
}
const initialState : HomeState = {
    cars:[],
    currentPage:1,
    numberOfPages:1,
    searchChange:"",
    btnSearch:true,
       
}
interface CarPagination{
    cars:Car[],
    numberOfPages:number

}

export interface InitCarListAction { type: 'HOME/INITCARS', payload:CarPagination }
export interface SearchCarsAction { type: 'HOME/SEARCHCARS', payload: Car[] }
export interface SearchChangeAction {type:'HOME/SEARCHCHANGE',payload:string}
export interface InitCarByUserIdAction {type:'HOME/INITCARUSERID',payload:Car[]}
export interface ChangePage {type:'HOME/CHANGEPAGE',payload:number}

export type KnownAction = InitCarListAction | SearchCarsAction | SearchChangeAction | InitCarByUserIdAction | ChangePage;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    initCarAction: async (userPage:boolean=false)  => async (dispatch:Dispatch<any>, getState:Function) => {
        console.log(`USERPAGEEEE${userPage}`)
        const currentPage = getState().home.currentPage;
        const searchTerm = getState().home.searchChange;
        let response = await fetch(`https://localhost:7220/Car/GetPaginatedCar?current=${currentPage}&searchTerm=${searchTerm}&userPage=${userPage}`,{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
            body:null});
            
        const carResponse = await response.json();
        console.log(carResponse)
        dispatch({type:"HOME/INITCARS", payload:{cars:carResponse.items, numberOfPages:carResponse.pageNumber}})
    },
    changePage: async (increment:number)  => async (dispatch:Dispatch<any>, getState:Function) => {
        const currentPage = getState().home.currentPage;
        const newPage = currentPage + increment;
        dispatch({type:"HOME/CHANGEPAGE",payload:newPage})
    },
    searchChangeAction: (value:string)=>{
         return {type:"HOME/SEARCHCHANGE",payload:value}
    },
    
    initCarUserIdAction: async ():Promise<InitCarByUserIdAction>=>{
        const token=localStorage.getItem('token');
        let response=await fetch("https://localhost:7220/Car/GetCarByUserId",{
            method:"GET",
            headers:{
                'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + token
            },
            body:null

        });      
        let carResponse:Car[]=await response.json() as Car[];
      return {type:'HOME/INITCARUSERID',payload:carResponse}
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<HomeState> = (state: HomeState | undefined, incomingAction: Action): HomeState => {
    if (state === undefined) {
        return initialState;
    }
   
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'HOME/INITCARS':
            const newState = JSON.parse(JSON.stringify(state))
            newState.cars = action.payload.cars;
            newState.numberOfPages = action.payload.numberOfPages;
            return newState;
        case 'HOME/SEARCHCHANGE':
            state.searchChange=action.payload
            if(state.searchChange=="")
            {
               
               state.btnSearch=true;
               console.log(state.btnSearch)
               console.log(state.searchChange.length)
            }
            else
            {
             state.btnSearch=false;
             console.log(state.btnSearch)
               console.log(state.searchChange.length)
            }
            console.log("AAAAA")
            return {...state,searchChange:action.payload}
        case 'HOME/SEARCHCARS':
            const searchState=JSON.parse(JSON.stringify(state))
            searchState.cars=action.payload;
            return searchState;
        case 'HOME/INITCARUSERID':
            console.log(action.payload)
            const newStateId = JSON.parse(JSON.stringify(state))      
            newStateId.cars = action.payload;
            return newStateId;
        case 'HOME/CHANGEPAGE':
            return {...state, currentPage:action.payload}
        default:
            return state;
    }
};
