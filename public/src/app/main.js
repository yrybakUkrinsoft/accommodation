import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';


import Header from './view/Header/Header'
import Overview from './view/Overview/Overview'

import store from './store'

const router = (
    <Provider store={store}>
        <div>
            <Header/>
            <Overview/>
        </div>
    </Provider>
);

render(router, document.getElementById('app'));


