/**
 * Hooks
 * 함수형 컴포넌트에서도 state를 관리할 수 있는 기능들을 제공함
 */

import { useCallback } from "react";



/** 
 * 1. useState
 * 컴포넌트에서 state를 관리할 수 있게 해줌
 * useState(초기값)을 호출하면 배열을 반환 [초기값, setter함수]
 * 당연히 한 컴포넌트에서 useState를 여러번 사용할 수 있다
 */
 const Counter = () => {
    const [value, setValue] = useState(0);
    return (
        <>
            <p>current value: {value}</p>
            <button onClick={()=> setValue(value+1)}> ++ </button>
            <button onClick={()=> setValue(value-1)}> -- </button>
        </>
    );
};



/**
 * 2. useEffect
 * 컴포넌트가 렌더링 될때마다 특정작업을 수행하도록 설정할 수 있음
 * componentDidMount + componentDidUpdate를 합친형태로 봐도 무방
 * -> useEffect(callback)
 * 
 * 마운트될 때에만 실행하고 싶으면
 * useEffect의 두번째 파라미터로 빈 배열을 주면됨 
 * -> useEffect(callback, []);
 * 
 * 특정 값이 업데이트될 때만 실행하고 싶다면
 * useEffect의 두번째 파라미터로 배열을 주되 요소에 검사하고 싶은 값을 넣어주면됨
 * -> useEffect(callback, [name]);
 * 
 * 컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면
 * useEffect에서 뒷정리 함수를 리턴해야함
 * -> useEffect(()=> {
 *        console.log('effect');
 *        return () => {
 *            console.log('clean up')
 *        }
 *    }, [name])
 * 
 * 언마운트될때에만 수행하고 싶다면
 * 뒷정리함수를 리턴하고 두번째 파라미터로 빈배열을 주면됨
 * -> useEffect(()=> {
 *        console.log('effect');
 *        return () => {
 *            console.log('clean up')
 *        }
 *    }, [])
 * 
 * 정리
 * useEffect는 변화를 감지하는 Hook임
 * 기본적으로 렌더링되고 난 직후 실행됨
 * 두 번째 파라미터(배열)를 넣는다는 것은 마운트또는 특정값이 업데이트될때만 수행하겠다는 것
 * (빈 배열: 마운트될때만, 배열에state요소가 있을때: 그 state가 변화할때만)
 * 첫 번쨰 파라미터(콜백함수)의 뒷정리함수를 넣는다는 것은 어떤 작업 직전에 수행하겠다는 것
 * (뒷정리함수를 넣고, 두 번째 파라미터에 빈배열: 언마운트시 직전에 실행, 배열에state요소가 있을때: 그 state의 변화직전 수행)
 */
const Info = () => {
    const [name, setName] = useState('');
    const [nick, setNick] = useState('');

    useEffect(() => {
        console.log('rendering complete');
        console.log({name, nick});
        // return () => {
        // }
    });

    const change = (e) => {
        const value = e.target.value;
        (e.target.name === 'name') ? setName(value) : setNick(value);
    }

    return (
        <div>
            <input name="name" value={name} onChange={change}></input>
            <input name="nick" valu={nick} onChange={change}></input>
            <p>{name}</p>
            <p>{nick}</p>
            
        </div>
    );
};



/**
 * 3. useReducer
 * useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트 해줄 수 있다
 * useReducer(param1, param2) param1에는 리듀서함수를 넣고 param2에는 초기값을 넣는다
 * 함수를 호출하면 state값과 dispatch함수를 리턴함
 * state는 현재 가리키고 있는 상태이며, dispatch는 액션을 발생시키는 함수임(함수안에 파라미터로 액션 값을 넣어주면 리듀서 함수를 호출함)
 * 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것
 * 액션은 어떠한 값도 사용가능함
 * 아래 예제는 input여러개를 useReducer로 관리하는 예제임
 */
// 현재 상태 state와 action을 파라미터로 받음
function reducer(state, action) {
    return {
        ...state,
        [action.name]: action.value,
    };  
}
const Info = () => {
    const [state, dispatch] = useReducer(reducer, {name:'', nick: ''});
    const {name, nick} = state;

    const change = (e) => {
        dispatch(e.target);
    }

    return (
        <div>
            <input name="name" value={name} onChange={change}></input>
            <input name="nick" valu={nick} onChange={change}></input>
            <p>{name}</p>
            <p>{nick}</p>
            
        </div>
    );
};



/**
 * 4. useMemo
 * 컴포넌트 내부에서 발생하는  연산을 최적화 할 수 있다
 */
 const getAvg = array => {
    if(array.length === 0) return 0;
    return array.reduce((a,b)=> a + b) / array.length;
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'num':
            return {...state, num: action.num};
        case 'list':
            return {...state, list: [...state.list, action.num]};
        default:
            return state;
    }
};

const Average = () => {
    const [state, dispatch] = useReducer(reducer, {num: '', list: []});
    const {num, list} = state;

    const change = (e) => {
        dispatch({type: 'num', num: parseInt(e.target.value)});
    };
    
    // list의 내용이 바뀔때만 평균을 구함
    // useMemo를 사용하지 않고 jsx에 {getAvg(list)}를 사용하면
    // input값이 바뀔때마다 호출함(필요없는 연산을 더 하게됨..)
    const avg = useMemo(() => getAvg(list), [list]);

    const click = () => {
        if(!num) {
            alert('no number');
            return;
        }
        dispatch({type: 'list', num: num});
        dispatch({type: 'num', num: ''});
    };

    return (
        <div>
            <input type='number' value={num} onChange={change}/>
            <button type='button' onClick={click}>submit</button>
            <h1>평균값 {avg}</h1>
        </div>
    );
};



/**
 * 5. useCallback
 * 주로 렌더링 성능을 최적화할때 사용함
 * 만들어 놨던 함수를 재사용할 수 있다
 * 위 예제에서 change와 click은 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용함
 * 규모가 작으면 상관없지만 자주발생하거나 갯수가 많아지면 최적화 해주는게 좋음
 * useCallback(param1, param2)
 * param1에는 리렌더링되는 함수
 * param2에는 배열(특정 값이 바뀌었을때 함수를 새로 생성해야 하는지 명시)
 * 
 * click처럼 param2에 num, list요소를 넣으면 num, list의 변화가 생기면
 * 함수를 새로 만들어 리렌더링함 -> 함수내부에서 상태값에 의존하는경우는 반드시 요소를 넣어줘야함
 * 만약 빈배열넣으면 기존함수를 계속 다시씀
 */
const change = useCallback((e) => {
    dispatch({type: 'num', num: parseInt(e.target.value)});
}, []);

const click = useCallback(() => {
    if(!num) {
        alert('no number');
        return;
    }
    dispatch({type: 'list', num: num});
    dispatch({type: 'num', num: ''});
}, [num, list]);



/**
 * 6. useRef
 * ref를 쉽게 사용할 수 있도록함
 * useRef(null)의 리턴값은 {current: null}임
 * ref={inputEl}을 해주면
 * current 값이 실제 엘리먼트를 가리킴
 * ref는 DOM을 직접적으로 건드려야할때만 사용하자
 */
 const Average = () => {
    const inputEl = useRef(null);
    const click = () => {
        inputEl.current.focus();
    };

    return (
        <div>
            <input type='number' value={num} onChange={change} ref={inputEl}/>
            <button type='button' onClick={click}>submit</button>
        </div>
    );
};