import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { combineReducers } from 'redux'; // -immutable
import { Provider } from 'react-redux';
import dogReducer from 'src/client/reducers/dog-reducer';
import BarkMessage from 'src/client/containers/bark-message';
import BarkButton from 'src/client/containers/bark-button';

const store = createStore(combineReducers({
    dog: dogReducer,
}));

ReactDOM.render(
    <Provider store={store}>
        <div>
            <BarkMessage />
            <BarkButton />
        </div>
    </Provider>
    , document.querySelector('.app')
);
