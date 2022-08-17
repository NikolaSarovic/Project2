import React from 'react'
import { ApplicationState } from '../store';
import * as HomeStore from '../store/homeStore'
import { useDispatch, useSelector } from 'react-redux';
import { Car } from '../store/Interfaces/HomeInterfaces';
import CarView from './CarView';

export default function CarManage() {
    const dispatch = useDispatch()
    const state = useSelector((appstate:ApplicationState) => appstate.home)

    React.useEffect(()=>{
        (async function(){
          dispatch(HomeStore.actionCreators.searchChangeAction(""));
          dispatch(await HomeStore.actionCreators.initCarUserIdAction());
    
        })()
      },[])
    
  return (
    <div>
    {state && state.cars && state.cars.map((item:Car) => {
                     return( <CarView car={item} pom={true}></CarView>);
    })} 
    </div>
  )
}
