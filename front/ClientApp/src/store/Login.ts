
import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface LoginState {
    username: string,
    password: string
}


interface LoginData {
    Username: string,
    Password: string
}

const initialState: LoginState = {
    username: '',
    password: ''
}
export interface ChangeUsername { type: 'LOGIN/CHANGEUSERNAME', payload: string }
export interface ChangePassword { type: 'LOGIN/CHANGEPASSWORD', payload: string }
export interface LoginAction { type: 'LOGIN/LOGIN', payload: LoginData }


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
    login: () => {

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
        default:
            return state;
    }
};
