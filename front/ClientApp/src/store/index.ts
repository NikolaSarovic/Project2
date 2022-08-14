import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Login from './Login';
import * as RegisterStore from './RegisterStore';
import * as HomeStore from './homeStore';
import * as ImageStore from './ImageStore';
import * as PasswordStore from './PasswordStore';
import * as CreateCarStore from './CreateCarStore'


// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    login: Login.LoginState | undefined;
    register:RegisterStore.RegisterState | undefined;
    home:HomeStore.HomeState | undefined;
    image:ImageStore.ImageStore | undefined;
    password:PasswordStore.PasswordStore | undefined;
    car:CreateCarStore.CreateCarStore | undefined;

  
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    login: Login.reducer,
    register:RegisterStore.reducer,
    home: HomeStore.reducer,
    image:ImageStore.reducer,
    password:PasswordStore.reducer,
    car:CreateCarStore.reducer,
  
  
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
