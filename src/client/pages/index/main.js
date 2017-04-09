import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import { combineReducers } from 'redux'; // -immutable
// import { Provider } from 'react-redux';
require('./main.scss');

let pages = {
    dog: '/views/dog.html',
    presentation: '/views/presentation.html'
};

let map = Object.keys(pages).map(function(item) {
    return <li key={item}><a href={pages[item]}>{item}</a></li>
});

class NotesList extends Component {
    static propTypes = {
        one: React.PropTypes.string.isRequired,
    };

    render() {
        return (
            <ol>
                {
                    React.Children.map(this.props.children, (child) => {
                        return <li>{ child } </li>;
                    })
                }
            </ol>
        )
    }
}

// NotesList.propTypes = {
//     one: React.PropTypes.string.isRequired,
// };

ReactDOM.render(
    <div>
        <ul className="page-list">
            {map}
        </ul>
        <NotesList one={'now'}>
            <span>aaa</span>
            <span>bbb</span>
            <span>ccc</span>
            <span>ddd</span>
            <a href="#">81</a>
            <a href="#">456</a>
        </NotesList>
    </div>
    , document.querySelector('.app')
);
