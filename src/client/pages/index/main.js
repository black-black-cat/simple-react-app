import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import { combineReducers } from 'redux'; // -immutable
// import { Provider } from 'react-redux';
require('./main.scss');

var pages = {
    dog: '/views/dog.html',
    presentation: '/views/presentation.html'
}

var map = Object.keys(pages).map(function(item) {
    return <li key={item}><a href={pages[item]}>{item}</a></li>
})

ReactDOM.render(
    <div>
        <ul className="page-list">
            {map}
        </ul>
    </div>
    , document.querySelector('.app')
);
