import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as HomeStore from '../store/homeStore'
import { ApplicationState } from '../store';
import { Car } from '../store/Interfaces/HomeInterfaces';
import CarView from './CarView';
import Pagination from '@mui/material/Pagination';

const Home = () => {
  const dispatch = useDispatch()
  const state = useSelector((appstate:ApplicationState) => appstate.home)
  const change = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({type:"HOME/CHANGEPAGE",payload:value});
    (async function(){
      dispatch(await HomeStore.actionCreators.initCarAction());

    })()
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


      <Pagination style={{margin:"auto auto 50px auto"}} onChange={change} count={state!.numberOfPages} defaultPage={1}  boundaryCount={1} />
            </div>)
      };

export default Home;


