import React, {Component, Fragment, useState} from 'react';
import PropTypes from 'prop-types';

/** 
 * 클래스형 컴포넌트
 * (state 기능, 라이프사이클, 임의의 메서드) 가 가능하다
 * render함수가 필수고, jsx를 리턴해야함
 * 
 * 함수형 컴포넌트는 state와 라이프사이클 API가 사용불가 했지만
 * Hooks 도입이후 가능해짐
 * 
 * 함수형컴포넌트와 Hooks사용을 권장함
 */
class App extends Component {
    render() {
        const name = 1;
        return (<div>{name}</div>);
    }
}

/**
 * props
 * properties의 줄임말로 컴포넌트의 속성을 정의할 때 사용하는 요소임
 * 만약 여기서 Parent가 Child를 import해서 사용하는 상황이라면
 * 부모인 Parent에서 인수를 주고 자식인 Child에서 인수를 받아 사용할 수 있다
 * 부모가 props를 주면 자식은 props를 받아 사용함
 */
const Parent = () => {
    return (
        <>
            <Child name='choi'/>

            {/* 
                태그 사이의 내용을 보여주기 위해선 
                props를 받아 사용하는 컴포넌트 쪽에서 props.children을 사용해야함
            */}
            <Child>children</Child>
        </>

    );
}
const Child = props => {
    // 객체 디스트럭처링 할당을 통해 props를 받을 수 도 있음
    const {name, children} = props;

    /**
     * 만약 클래스형 컴포넌트라면
     * const {name. children} = this.props
     * static defaultProps = {
     *      name: '',
     * }
     * 
     * statuc propTypes = {
     *      name: PropTypes.string.isRequired
     * }
     */

    return (
        <div className={props.name}>
            props test

            {/* 태그사이 내용 보여주기 */}
            {props.children}
        </div>);
};
/**
 * default props 설정
 * props를 받아서 사용하는 컴포넌트 쪽에서 
 * 만약 props가 없을 시 props의 기본값을 설정하려면...
 */
Child.defaultProps = {
    name: 'choi',
};
/**
 * propTypes 설정(import 해야함)
 * 종류로는
 * array: 배열
 * arrayOf(PropTypes.number): 숫자로 이뤄진 배열
 * bool: true or false
 * number: 숫자
 * object: 객체
 * string: 문자열
 * symbol: ES6 Symbol
 * node: 렌더링할 수 있는 모든 것
 * instanceOf(클래스): 특정클래스의 인스턴스
 * oneOf(['dog', 'cat']): 주어진 배열 요소중 하나
 * oneOfType([React.PropTypes.string ... ]): 주어진 배열 요소타입 중 하나
 * any: 아무종류
 */
Child.PropTypes = {
    name: PropTypes.string.isRequired, // name은 string 이어야함, 그리고 필수임
};
/**
 * props정리 
 * 부모 컴포넌트(import를 선언하고 해당 컴포넌트를 사용하는 컴포넌트)에서는 
 * props 값을 줄 수 있다 (state도 줄 수 있음)
 * 자식 컴포넌트(export 하는 컴포넌트)에서는 props를 받아서 사용할 수 있으며
 * props의 default 값과 type을 지정해놓을 수 있다
 */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * state
 * 내부에서 바뀔 수 있는 값(부모컴포넌트에서)
 */

// 클래스형 컴포넌트의 state
class Counter extends Component {
    // state 설정
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
                    /** this.setState() 인수에 객체를 전달할 수 있음 */
                    onClick={()=> {
                        this.setState({number: this.state.number+1})
                    }}

                    /**
                     * this.setState() 인수에 콜백함수를 전달할 수 있음
                     * 콜백함수의 첫번째 파라미터는 기존 props이고
                     * 두번째 파라미터는 현재의 props임
                     */
                    onClick={()=> {
                        this.setState((prevProps, currentProps) => 
                            ({number: prev.number+1})
                        )
                    }}

                    /** 
                     * this.setState이후 특정작업 수행
                     * 두번째 파라미터로 callback함수를 전달할 수 있다
                     */
                    onClick={()=> {
                        this.setState(
                            {number: number+1}, 
                            ()=> {
                                console.log('this.setState callback');
                            }
                        );
                    }}
                >plus</button>
            </div>
        );
    }
}

// 함수형 컴포넌트의 callback(useState를 import해야함)
const Say = () => {
    // useState(파라미터1)
    // 파라미터1에서 초기값을 설정할 수 있음
    // 호출시 배열리턴함 [초기값, function]
    // 첫번째 원소는 현재 상태, 두번째 원소는 상태를 바꾸어 주는 함수(setter함수)
    // 한 컴포넌트에서 여러번 useState를 사용할 수 있음
    // (단 세터함수를 set**이 아닌 다른 문자로하면 setter함수가 정의되지 않았다는 오류 리턴)
    const [message, setMessage] = useState('');
    const enter = () => {setMessage('hi');};
    const leave = () => {setMessage('bye');};

    // 만약 state가 객체나 배열이라면 사본을 만든 후 setState함수나 세터함수를 이용해 변경해준다
    // 객체라면
    state = {
        obj: {a:1, b:2},
    }
    const [obj, setObj] = useState({a: 1, b: 2});
    // 스프레드 문법을써서 사본객체를 만든 후 세터함수를 사용함
    const newObj = {...obj, c:3}; // 사본객체 만들기 및 프로퍼티 추가
    delete newObj.c; // 프로퍼티 삭제
    // setState(newObj);
    // setObj({...obj, b:2});

    // 배열이라면
    state = {
        array = [
            {id:1, value:1},
            {id:3, value:3},
        ]
    };
    const [array, setArray] = useState([
        {id:1, value:1},
        {id:3, value:3},
    ]);  
    let newArray = [...array, {id:4, value:4}]; // 사본배열 만들기 및 원소 추가
    newArray.map(item=> (item.id===1) ? {id: item.id, value: 2} : item); // 객체 프로퍼티 값 변경
    newArray.filter(item => item.id !== 2); // id가 2인 배열의 원소 삭제
    // setState(newArray);
    // setArray(newArray)

    return (
        <div>
            <button onClick={enter}>입장</button>
            <button onClick={leave}>퇴장</button>
            <h1>{message}</h1>
        </div>
    );
};
/**
 * state 정리
 * state는 컴포넌트 내부에 자체적으로 지닌 값이다 
 * 클래스형 컴포넌트에서는 state객체 및 setState로 state를 관리할 수 있고
 * 함수형 컴포넌트에서는 useState를 통해 state를 관리할 수 있다(권장)
 */

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * component의 반복
 */
const IterationSample = () => {
    const [names, setNames] = useState([]);
    const [next, setNext] = useState(1);
    const [name, setName] = useState('');

    const change = (e) => {
        setName(e.target.value);
    };

    const click = () => {
        if(!name) {
            alert('no name');
            return;
        }

        setNames([...names, {id:next, name:name}]);
        setNext(next + 1);
        setName('');
    };

    /**
     * map을 이용해 component를 반복할 수 있음
     * filter를 이용해 component를 삭제할 수 있음
     * map, filter은 새로운 배열을 리턴함
     * 기존 state(names)는 그대로 두면서 새로운 값을 이용해서 작업해야함
     * 이를 "불변성유지" 라고함 -> 성능 최적화를 위해
     * 
     * 컴포넌트 배열을 렌더링할때엔 항상 key값 설정을 주의해야함
     * key가 중복되면 안됨 중복되면 렌더링과정에서 오류가 발생함
     * 
     * 주의할점
     * 1. state를 직접건드리면서 렌더링하면 안됨
     * 2. key값 설정에 주의해야함(중복되면 렌더링오류)
     */
    const remove = (id) => {
        setNames(names.filter(item => item.id !== id));
    };
    const list = names.map(item => <li onDoubleClick={()=> remove(item.id)} key={item.id}>{item.name}</li>);

    return (
        <div>
            <div>
                <input onChange={change} value={name}/>
                <button onClick={click}>add</button>
            </div>
            <ul>
                {list}
            </ul>
        </div>
    );
};


 export {App, Parent, Child, Say};