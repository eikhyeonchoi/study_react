import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = props => {
    return (
        <div>
            first component
            {props.name}
        </div>
    );
};

MyComponent.defaultProps ={
    name: 'default name props',
}
MyComponent.propTypes ={
    name: PropTypes.string.isRequired,
}

export default MyComponent;