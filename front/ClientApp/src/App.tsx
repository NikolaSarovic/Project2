import * as React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import './custom.css'
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import Alert from './components/Alert';
import Footer from './components/Footer';
import Login from './components/Login';
import UserOptions from './components/UserOptions';
import { createBrowserHistory } from 'history';
import UserBookPreview from './components/UserBookPreview';
import ProfileSettings from './components/ProfileSettings';
import ChangePassword from './components/ChangePassword';
import BookUpload from './components/BookUpload';
import EBookUpload from './components/EBookUpload';
import EBookPage from './components/EBookPage';


const history = createBrowserHistory();
export default () => (
    <Router history={history} >
        <Layout>
            < Header />
            <UserOptions />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/ebooklist' component={EBookPage} />
                <Route path='/counter' component={Counter} />
                <Route path='/ebookupload' component={EBookUpload} />
                <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
                <Route path='/registrationForm' component={RegistrationForm} />
                <Route path='/loginForm' component={Login} />
                <Route path='/bookPreview' component={UserBookPreview} />
                <Route path='/bookUpload' component={BookUpload} />
                <Route path='/profileSettings' component={ProfileSettings} />
                <Route path='/changePassword' component={ChangePassword} />
            </Switch>
            <Footer />
            <Alert />
        </Layout>
    </Router >
);
