/**
 * Redux 설계 패턴
 * 가장 많이 사용하는 패턴은 presentational component(이하 p)와 container component(이하 c)를 분리하는 것
 * 
 * p에선 주로 상태 관리가 이뤄지지 않고 단지 props를 받아와 화면에 UI를 보여 주기만 하는 컴포넌트를 의미함
 * c는 리덕스와 연동되어 있는 컴포넌트로 리덕스로부터 상태를 받아 오기도하고 리덕스 스토어에 액션을 디스패치 하기도 함
 * -> 리덕스와 연동된 컴포넌트를 컨테이너 컴포넌트라 부름
 * 예제 redux-tuto 프로젝트 참고...
 */

/**
 * 리덕스를 만드는 과정...
 * (리덕스를 통해 상태관리를 하는 과정?)
 * 리액트리덕스는 connect함수를 제외하곤 쓰지 않음
 * 
 * ※ (네이밍은 하기나름임)
 * 1. 모듈을 만듦
 * 모듈에는 액션타입, 액션생성함수, 초기값, 리듀서 등이 있어야함
 * 그냥 쌩으로 만들거나 redux-actions -> {createAction, handleActions}를 사용하거나
 * 
 * 2. 컨테이너를 만듦
 * 일단 컨테이너란 리덕스 스토어와 연동되는 컴포넌트라고 볼 수 있다
 * connect 함수를 이용해 컨테이너 컴포넌트와 리덕스 스토어를 연결함
 * 컨테이너에서의 리턴값?은 프레젠테이셔널 컴포넌트(props가 추가된)를 리턴하게 함
 * 그냥 쌩으로 만들거나 react-redux -> {useSelector, useDispatch}를 사용하거나
 * ※ useDispatch를 사용하면 useCallback도 같이 사용을 권장
 * // const dispatch = useDispatch();
 * // const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
 * ※ useSelector를 사용했다면 자동으로 최적화가 되지 않아 export시 React.memo를 컨테이너 컴포넌트에 사용해야 최적화가 됨
 * 
 * 3. 컴포넌트(프레젠테이셔널)를 만들어서 뿌린다
 * 단순히 컨테이너 컴포넌트에서 받은 props활용하면 됨
 * 기능을 붙이거나 이런건 없고 그냥 바인딩하는 정도
 * 
 * 4. 만든 리듀서를 합치고 스토어를 만들고 스토어에 등록함
 * redux -> combineReducers(객체)
 * 만들어진 리듀서들을 합침 -> 보통 /modules/index.js
 * export default combineReducers({...});
 * 
 * redux -> createStore(리듀서)
 * 스토어를 만듦 -> 보통 index.js
 * import {createStore} from 'redux';
 * import {combineWithDevTools} from 'redux-devtools-extension';
 * import {Provider} from 'react-redux';
 * const store = createStore(reducer, combineWithDevTools());
 * 
 * react-redux -> Provider를 통해 스토어를 등록?함
 * return <Provider store={store}><App/></Provider>
 */