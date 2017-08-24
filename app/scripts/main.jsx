'use strict'

import 'bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect} from 'react-router';
// import createHistory from 'history/lib/createBrowserHistory'
import createHistory from 'history/lib/createHashHistory'

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import Demo from 'components/Demo.jsx'

let store = createStore(
    applyMiddleware(thunkMiddleware)
);

const history = createHistory({
    queryKey: false
});

const appElement = document.createElement('div');

document.body.appendChild(appElement);

// check login
// function auth(next, replace) {
//     let isLogin = Auth.isLogin();
//     if (next.location.pathname === '/login' && isLogin) {
//         replace(null, '/');
//     } else if (next.location.pathname !== '/login' && !isLogin) {
//         replace(null, '/login');
//     }
// };

function onPathChange () {
    // TODO add logs here
};

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render((
    <Provider store={store}>
        <Router onUpdate={onPathChange} history={history}>
            <Route path='/' component={Demo} >
                
                
            </Route>
            
        </Router>
    </Provider>),
      appElement
    );
});
