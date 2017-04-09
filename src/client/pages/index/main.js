import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
// import { combineReducers } from 'redux'; // -immutable
// import { Provider } from 'react-redux';
require('./main.scss');

let pages = {
    dog: '/dog',
    presentation: '/reveal'
};

let map = Object.keys(pages).map(function(item) {
    return <li key={item}><a href={pages[item]}>{item}</a></li>
});

class NotesList extends Component {
    static propTypes = {
        one: React.PropTypes.string.isRequired
    };

    render() {
        return (
            <ol>
                <li>{ this.props.one }</li>
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
        <NotesList one={'' + new Date()}>
            <span>hello world</span>
            <span>see you again</span>
            <span>say you say me</span>
            <span>one year one day</span>
        </NotesList>
    </div>
    , document.querySelector('.app')
);
