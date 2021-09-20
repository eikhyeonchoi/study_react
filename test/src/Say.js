import React, {useState}from 'react';

const Say = () => {
    console.log(useState(''));
    const [message, setMessage] = useState('');
    const enter = () => {setMessage('hi');};
    const leave = () => {setMessage('bye');};
    return (
        <div>
            <button onClick={enter}>입장</button>
            <button onClick={leave}>퇴장</button>
            <h1>{message}</h1>
        </div>
    );
};

export default Say;