import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as HomeStore from '../store/homeStore'
import { ApplicationState } from '../store';
import { Car } from '../store/Interfaces/HomeInterfaces';
import { useState } from 'react';
import CarView from './CarView';

const Home = () => {
  const dispatch = useDispatch()
  const state = useSelector((appstate:ApplicationState) => appstate.home)
  const change = () =>{
    console.log(state)
  }
  React.useEffect(()=>{
    (async function(){
      dispatch(await HomeStore.actionCreators.initCarAction());

    })()
  },[])
  return (
    <div>
      {state && state.cars && state.cars.map((item:Car) => {
                       return( <CarView car={item}></CarView>);
      })} 
      </div>)
};

export default Home;
