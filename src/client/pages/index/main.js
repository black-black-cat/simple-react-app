import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import { combineReducers } from 'redux'; // -immutable
// import { Provider } from 'react-redux';

var pages = {
    dog: '/views/dog.html',
    presentation: '/views/presentation.html'
}

var map = Object.keys(pages).map(function(item) {
    return <a href={pages[item]}>{item}</a>
})

ReactDOM.render(
    <div>
        {map}
    </div>
    , document.querySelector('.app')
);
