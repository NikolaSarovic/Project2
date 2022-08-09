import { Action, Reducer } from 'redux';
import { Car } from './Interfaces/HomeInterfaces';


export interface HomeState{
    cars: Car[],
    searchChange:string,
    btnSearch:boolean
}
const initialState : HomeState = {
    cars:[],
    searchChange:"",
    btnSearch:true
    
}

export interface InitCarListAction { type: 'HOME/INITCARS', payload:Car[] }
export interface SearchCarsAction { type: 'HOME/SEARCHCARS', payload: Car[] }
export interface SearchChangeAction {type:'HOME/SEARCHCHANGE',payload:string}


export type KnownAction = InitCarListAction | SearchCarsAction | SearchChangeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    initCarAction: async () :Promise<InitCarListAction> => {
        let response = await fetch("https://localhost:7220/Car/GetAllCars",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },
            body:null});
        const carResponse : Car[] = await response.json() as Car[];
        return {type:"HOME/INITCARS", payload:carResponse}
    },
    searchChangeAction: (value:string)=>{
         return {type:"HOME/SEARCHCHANGE",payload:value}
    },
    searchCarAction: async (searchChange:string) :Promise<SearchCarsAction> =>{
        let response=await fetch(`https://localhost:7220/Car/SearchCar?search=${searchChange}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            },
            body:null});
        const carReponse:Car[]=await response.json() as Car[];
        return {type:"HOME/SEARCHCARS", payload:carReponse}
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
            newState.cars = action.payload;
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
            return {...state,searchChange:action.payload}
        case 'HOME/SEARCHCARS':
            const searchState=JSON.parse(JSON.stringify(state))
            searchState.cars=action.payload;
            return searchState;
        default:
            return state;
    }
};
