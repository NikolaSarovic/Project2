import { Action, Reducer } from 'redux';

export interface ImageStore {
    imageUrls : string[],
    btnClik:    boolean
}
const initialState:ImageStore={
    imageUrls:[],
    btnClik:false
}

export interface ImageUrlsAction {type:"IMAGEURL", payload:string[]}

export type KnownAction=ImageUrlsAction;

export const actionCreators={
    initImageUrls: (value:string[]) => {
        return {type:"IMAGEURL", payload:value}
        
    }

}

export const reducer:Reducer<ImageStore> =(state:ImageStore|undefined,IncomingAction:Action):ImageStore=>{
    if(state==undefined)
    return initialState;
    const action=IncomingAction as KnownAction;
    switch(action.type)
    {
        case'IMAGEURL':
        return {...state,imageUrls:action.payload};
        default:
        return state;
    }

}