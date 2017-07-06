import React from 'react';
import Reviews from './Reviews';
import Average from './Average';

export default () => {
    return (
        <div className="container">
            <Average/>
            <br/>
            <Reviews/>
        </div>
    )
}