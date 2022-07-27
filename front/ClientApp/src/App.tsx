import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Login from './components/Login';
import Register from './components/Register';
import './custom.css'
import { NavLink } from 'react-router-dom';
import NavMenu from './components/NavMenu';

export default () => (
    <Layout>
        <NavMenu></NavMenu>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
        </Switch>
    </Layout>
);
