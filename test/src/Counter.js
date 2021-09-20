import React, { Component } from 'react';

class Counter extends Component {
    state = {
            number: 0,
            fixedNumber: 100
    };

    render() {
        const {number, fixedNumber} = this.state;
        return (
            <div>
                <h1>{number}</h1>
                <h1>fixedNumber : {fixedNumber}</h1>
                <button
                    // onClick={()=> {
                    //     this.setState(prev => 
                    //         ({number: prev.number+1})
                    //     )
                    // }}

                    onClick={()=> {
                        this.setState(
                            (prev, current) => {
                                console.log(prev);
                                console.log(current);
                                return {number: prev.number + 1}
                            }, 
                            ()=> {console.log(1);}
                        );
                    }}
                >plus</button>
            </div>
        );
    }
}

export default Counter;