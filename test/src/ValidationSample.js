import React, { Component } from 'react';
import './ValidationSample.css'

class ValidationSample extends Component {
    state = {
        password: '',
        clicked: false,
        validated: false,
    };

    change = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    buttonClick = () => {
        this.setState({
            clicked: true,
            validated: this.state.password === '0000',
        })
        this.input.focus();
    }

    render() {
        return (
            <div>
                <input
                    ref={(ref) => {this.input = ref}}
                    type='password'
                    value={this.state.password}
                    onChange={this.change}
                    className={this.state.clicked ? (this.state.validated ? "success" : 'failure') : ''}
                />
                <button
                    type='button'
                    onClick={this.buttonClick}
                >confirm</button>
            </div>
        );
    }
}

export default ValidationSample;