import React from 'react'
import { ApplicationState } from '../store';
import * as HomeStore from '../store/homeStore'
import { useDispatch, useSelector } from 'react-redux';
import { Car } from '../store/Interfaces/HomeInterfaces';
import CarView from './CarView';
import { Grid } from '@material-ui/core';

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
       <Grid container spacing={2} >
    {state && state.cars && state.cars.map((item:Car) => {
                     return(<Grid item md={6} sm={12}> <CarView car={item} pom={true}></CarView> </Grid>);
    })} 
       </Grid>
    </div>
  )
}
