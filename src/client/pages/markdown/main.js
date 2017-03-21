import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ace from 'src/client/vendor/ace';
import 'src/client/vendor/mode-markdown'
import marked from 'marked';

class Editor extends Component {
    componentDidMount() {
        this.editor = ace.edit(this.props.id);
        this.editor.getSession().setMode("ace/mode/markdown");
        this.editor.setTheme("ace/theme/github");
        this.editor.setValue(this.props.value, 1);
        this.editor.on("change", this.onChange);
        this.editor.getSession().setUseWrapMode(true);
        this.editor.setShowPrintMargin(false);
    }

    componentWillReceiveProps(newProps) {
        if (this.editor.getValue() !== newProps.value) {
            this.editor.setValue(newProps.value, 1);
        }
    }

    onChange() {
        if (this.props.onChange) {
            this.props.onChange(this.editor.getValue());
        }
    }

    render() {
        return (
            <div
                id={this.props.id}
                className={this.props.className}>
            </div>
        );
    }
}

var Output = function (props) {
    return (
        <div
            className={props.className}
            dangerouslySetInnerHTML={props.rawMarkup}>
        </div>
    );
};

var Header = function (props) {
    return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        {props.brandText}
                    </a>
                </div>
                {props.children}
            </div>
        </nav>
    )
};

class Previewer extends Component {
    getInitialState() {
        return {
            text: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](http://freecodecamp.com/hermanfassett)*'
        };
    }

    handleChange(input) {
        this.setState({text: input});
    }

    rawMarkup() {
        var rawMarkup = marked(this.state.text.toString(), {sanitize: true});
        return {__html: rawMarkup};
    }

    render() {
        return (
            <div className="container-fluid full-height">
                <Header
                    brandText="Markdown Previewer">
                    <p className="navbar-text navbar-right hidden-xs">Made By Tommy Noe for <a
                        href="http://freecodecamp.com" className="navbar-link">Free Code Camp</a>
                    </p>
                </Header>
                <div className="row full-height space-top">
                    <Editor
                        id="editor"
                        className="editor col-xs-12 col-sm-6"
                        value={this.state.text}
                        onChange={this.handleChange}/>
                    <Output
                        className="output col-xs-12 col-sm-6"
                        rawMarkup={this.rawMarkup()}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Previewer />, document.getElementById("markdown"));
