import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as HomeStore from '../store/homeStore'
import { ApplicationState } from '../store';
import { Car } from '../store/Interfaces/HomeInterfaces';
import CarView from './CarView';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@material-ui/core';

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
      <Grid container spacing={2} >
      {state && state.cars && state.cars.map((item:Car) => {
                       return(<Grid item md={6} sm={12}> <CarView car={item}></CarView> </Grid>);
      })} 
      <Grid item md={12} sm={12}>
      <Pagination style={{margin:"25px", justifyContent:"center", display:'flex'}} onChange={change} count={state!.numberOfPages} defaultPage={1}  boundaryCount={1} />

      </Grid>
      </Grid>
      


            </div>)
      };

export default Home;


