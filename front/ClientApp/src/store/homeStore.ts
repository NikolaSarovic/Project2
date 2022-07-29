import { Action, Reducer } from 'redux';
import { Car } from './Interfaces/HomeInterfaces';


export interface HomeState{
    cars: Car[]
}
const initialState : HomeState = {
    cars:[]
}

export interface InitCarListAction { type: 'HOME/INITCARS', payload:Car[] }
export interface SearchCarsAction { type: 'HOME/SEARCHCARS', payload: Car[] }


export type KnownAction = InitCarListAction | SearchCarsAction;

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
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<HomeState> = (state: HomeState | undefined, incomingAction: Action): HomeState => {
    if (state === undefined) {
        return initialState;
    }
    console.log(state)
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'HOME/INITCARS':
            const newState = JSON.parse(JSON.stringify(state))
            newState.cars = action.payload;
            return newState
        case 'HOME/SEARCHCARS':
            return { ...state, cars: action.payload }
        default:
            return state;
    }
};
