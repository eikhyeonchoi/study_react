import React, { useState } from 'react';

const Event = () => {
    const [obj, setObj] = useState({a: '', b: ''});

    const click = () => {
        console.log(obj);
        setObj({...obj, a:'', b:''});
    };

    const change = (e) => {
        setObj({...obj, [e.target.name]: e.target.value});
    };

    return (
        <div>
            <input
                type='text'
                name='a'
                onChange={change}
            />
            <input
                type='text'
                name='b'
                onChange={change}
            />

            <button
                type='button'
                onClick={click}
            >confirm</button>
        </div>
    );
};

export default Event;