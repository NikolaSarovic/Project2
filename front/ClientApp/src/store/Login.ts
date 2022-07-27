
import { Action, Reducer } from 'redux';


export interface LoginState {
    username: string,
    password: string
}


interface LoginData {
    username: string,
    password: string
}

const initialState: LoginState = {
    username: '',
    password: ''
}
export interface ChangeUsername { type: 'LOGIN/CHANGEUSERNAME', payload: string }
export interface ChangePassword { type: 'LOGIN/CHANGEPASSWORD', payload: string }
export interface LoginAction { type: 'LOGIN/LOGIN' }


export type KnownAction = ChangeUsername | ChangePassword | LoginAction;

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
    login: (loginData:LoginData) => {
        fetch("https://localhost:7220/Authenticate/login",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({
                username:loginData.username,
                password:loginData.password})
        })
        .then(result => result.json())
        .then(result => localStorage.setItem("token",result.token))
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
            console.log(action.payload)
            return { ...state, username: action.payload }
        case 'LOGIN/CHANGEPASSWORD':
            return { ...state, password: action.payload }
        case 'LOGIN/LOGIN':
            return {...state}
        default:
            return state;
    }
};
