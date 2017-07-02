import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';


import Header from './view/Header/Header'
import LeftMenu from './view/LeftMenu/Menu'
import Overview from './view/Overview/Overview'

const store = {};

const router = (
    <Provider store={store}>
        <div>
            <Header/>
            <div className="container-fluid">
                <div className="row">
                    <LeftMenu/>
                    <Overview/>
                </div>
            </div>
        </div>
    </Provider>
);

render(router, document.getElementById('app'));


