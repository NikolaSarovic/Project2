import * as React from 'react';
import Layout from './components/Layout';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import  Header  from './components/Header';
import Home from './components/Home';
import  Login  from  './components/Login';


const history = createBrowserHistory();
export default () => (
    <Router history={history} >
    <Layout>
        < Header />
         <Switch>
            <Route exact path='/' component={Home}/>
            <Route excat path='/loginForm' compontent={Login}/>
         
        </Switch>
        
    </Layout>
</Router >
   
);
