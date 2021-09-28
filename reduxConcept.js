/**
 * Redux
 * 전역상태를 효율적으로 관리해주는 라이브러리
 * 
 * 규칙
 * 1. 단일 스토어
 * 
 * 2. 읽기 전용 상태
 * 상태를 바꿔줄 때 불변성을 지키면서 상태를 변경해야함
 * 
 * 3. 리듀서는 순수한 함수
 * 이전상태와 액션객체를 파라미터로 받음
 * 파라미터외의 값엔 의존하면 안됨
 * 불변성을 지켜야함
 * 똑같은 파라미터로 호출하면 언제나 같은 결과 값을 리턴해야함
 * 
 * 미리 알고가는 개념
 * 1. 액션
 * 상태에 변화가 필요하면 액션이 발생함(액션은 객체이며 type 프로퍼티가 반드시 있어야함)
 * 
 * 2. 액션 생성 함수
 * 액션 객체를 만들어 주는 함수
 * 매번 액션객체를 일일히 만들기 불편하기 때문에 액션 객체를 리턴하는 함수를 정의해놓는 것
 * 
 * 3. 리듀서
 * 변화를 일으키는 함수
 * 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아옴
 * 그리고 두 값을 참고해 새로운 상태를 만들어서 리턴해줌
 * 
 * 4. 스토어
 * 한 프로젝트는 스토어가 1개
 * 스토어에는 상태와 리듀서가 들어가 있으면서 내장함수도 있다
 * 
 * 5. 디스패치
 * 스토어의 내장함수 중 하나로 액션을 직접 발생시킴
 * 리듀서 함수를 실행시켜 새로운 상태를 만듦
 * 보통 dispatch(액션 생성 함수) 이렇게 사용함
 * 
 * 6. 구독
 * 스토어의 내장함수 중 하나로 subscribe 함수 안에 리스너 함수를 파라미터로
 * 넣어서 호출하면 리스너 함수가 액션이 디스패치되어 상태가 업데이트될 때마다 호출됨
 */

// 예제
import { createStore } from "redux";

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnInc = document.querySelector('#inc');
const btnDec = document.querySelector('#dec');

// 액션 타입
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INC = 'INC';
const DEC = 'DEC';

// 액션 생성 함수
const toggleSwitch = () => ({type: TOGGLE_SWITCH});
const inc = diffence => ({type: INC, diffence});
const dec = () => ({type: DEC});

// 초깃값 설정
const initialState = {
    toggle: false,
    counter: 0,
};

// 리듀서 함수(변화를 일으키는 함수)
function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state,
                toggle: !(state.toggle),
            };
        case INC:
            return {
                ...state,
                counter: state.counter + action.diffence
            };
        case DEC:
            return {
                ...state,
                counter: state.counter - 1,
            };
        default: 
            return state;
    }
}

const store = createStore(reducer);
const render = () => {
    const state = store.getState();
    if(state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }
    counter.innerText = state.counter;
};

render();

store.subscribe(render);
divToggle.onclick = () => {
    // dispatch 함수의 파라미터로 액션 생성 함수를 넣는다
    store.dispatch(toggleSwitch());
}
btnInc.onclick = () => {store.dispatch(inc(1));}
btnDec.onclick = () => {store.dispatch(dec());}